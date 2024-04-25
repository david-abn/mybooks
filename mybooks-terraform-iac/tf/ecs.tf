resource "aws_ecs_cluster" "ecs_cluster" {
  name = "mybooks-ecs-cluster"
}

resource "aws_ecs_capacity_provider" "ecs_capacity_provider" {
  name = "mybooks-ecs-capacity-provider"
  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.ecs_asg.arn
    managed_scaling {
      maximum_scaling_step_size = 1000
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 1
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "ecs_cluster_capacity_provider" {
  cluster_name       = aws_ecs_cluster.ecs_cluster.name
  capacity_providers = [aws_ecs_capacity_provider.ecs_capacity_provider.name]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = aws_ecs_capacity_provider.ecs_capacity_provider.name
  }
}

resource "aws_ecs_task_definition" "ecs_task_definition" {
  # Requires DB instance to be created first for the DB connection creds.
  depends_on   = [aws_db_instance.mybooks_rds_instance]
  family       = "mybooks-ecs-task"
  network_mode = "awsvpc"
  cpu          = 256
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  container_definitions = jsonencode([
    {
      name      = "mybooks-backend-expressjs"
      image     = "ecr image here"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 443
          hostPort      = 443
          protocol      = "tcp"
        }
      ]
      environment = [
        for key, value in var.container_env_vars :
        {
          name  = key
          value = value
        }
      ]
    }
  ])
}


resource "aws_ecs_service" "ecs_service" {
  name            = "my-ecs-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count   = 1
  network_configuration {
    subnets         = [aws_subnet.public_subnets[*].id]
    security_groups = [aws_security_group.security_group.id]
  }
  force_new_deployment = true
  placement_constraints {
    type = "memberOf"
  }
  triggers = {
    redeployment = timestamp()
  }
  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.ecs_capacity_provider.name
    weight            = 100
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.ecs_tg.arn
    container_name   = "mybooks-backend-expressjs"
    container_port   = "443"
  }
  depends_on = [aws_autoscaling_group.ecs_asg]
}
