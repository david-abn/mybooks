# Create private key to be used for EC2 instance
resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}
resource "aws_key_pair" "ecs_instance_keypair" {
  key_name   = "ecs-instance-keypair"
  public_key = tls_private_key.my_key.public_key_openssh
}
resource "local_file" "private_key_file" {
  content  = tls_private_key.my_key.private_key_pem
  filename = "~/.ssh/mybooks_ec2_instance-Key.pem" # Save the private key to your SSH directory
}

# Create Launch template for EC2 instance config
resource "aws_launch_template" "ecs_lt" {
  name_prefix   = "ecs-template"
  image_id      = "ami-012165a65c883b871" # Hardcoding the ECS-optimised AMI for AL2
  instance_type = "t3.micro"
  key_name      = aws_key_pair.ecs_instance_keypair.key_name

  vpc_security_group_ids = [aws_security_group.security_group.id]

  iam_instance_profile {
    name = "ecsInstanceRole"
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 30
      volume_type = "gp2"
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "ecs-instance"
    }
  }

  user_data = filebase64("${path.module}/ecs.sh")
}

# Create auto scaling group for EC2 Instances
resource "aws_autoscaling_group" "ecs_asg" {
  vpc_zone_identifier = aws_subnet.public_subnets[*].id
  desired_capacity    = 1
  max_size            = 1
  min_size            = 0

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

# Create ALB
resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = aws_subnet.public_subnets[*].id
  tags = {
    Name = "ecs-alb"
  }
}

# HTTPS traffic forwards to EC2 Target group
resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.mybooks_certificate_request.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }
}

# HTTP traffic redirect to HTTPS
resource "aws_lb_listener" "http_redirect_to_https" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}


resource "aws_lb_target_group" "ecs_tg" {
  name        = "ecs-target-group"
  port        = "443"
  protocol    = "HTTPS"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    path = "/health"
  }
}
