resource "aws_vpc" "main" {
 cidr_block           = var.vpc_cidr
 enable_dns_hostnames = true
 tags = {
   name = "main"
 }
}

resource "aws_subnet" "public_subnets" {
 count      = length(var.public_subnet_cidrs)
 vpc_id     = aws_vpc.main.id
 cidr_block = element(var.public_subnet_cidrs, count.index)
 availability_zone = element(var.azs, count.index)
 tags = {
   Name = "Public Subnet ${count.index + 1}"
 }
}

resource "aws_subnet" "private_subnets" {
 count      = length(var.private_subnet_cidrs)
 vpc_id     = aws_vpc.main.id
 cidr_block = element(var.private_subnet_cidrs, count.index)
 availability_zone = element(var.azs, count.index)
 tags = {
   Name = "Private Subnet ${count.index + 1}"
 }
}

# resource "aws_subnet" "public_subnet1" {
#  vpc_id                  = aws_vpc.main.id
#  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 1)
#  map_public_ip_on_launch = true
#  availability_zone       = "ap-southeast-2"
# }
# resource "aws_subnet" "public_subnet2" {
#  vpc_id                  = aws_vpc.main.id
#  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, 2)
#  map_public_ip_on_launch = true
#  availability_zone       = "ap-southeast-1"
# }

resource "aws_internet_gateway" "internet_gateway" {
 vpc_id = aws_vpc.main.id
 tags = {
   Name = "internet_gateway"
 }
}

resource "aws_route_table" "second_rt" {
 vpc_id = aws_vpc.main.id
 route {
   cidr_block = "0.0.0.0/0"
   gateway_id = aws_internet_gateway.internet_gateway.id
 }

 tags = {
    Name = "2nd Route Table"
 }
}

resource "aws_route_table_association" "public_subnet_asso" {
 count = length(var.public_subnet_cidrs)
 subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
 route_table_id = aws_route_table.second_rt.id
}

# resource "aws_route_table_association" "public_subnet1_route" {
#  subnet_id      = aws_subnet.public_subnet1.id
#  route_table_id = aws_route_table.route_table.id
# }

# resource "aws_route_table_association" "public_subnet2_route" {
#  subnet_id      = aws_subnet.public_subnet2.id
#  route_table_id = aws_route_table.route_table.id
# }

resource "aws_security_group" "ecs_security_group" {
 name   = "ecs-security-group"
 vpc_id = aws_vpc.main.id
 tags = {
    Name = "ecs-security-group"
 }
}
resource "aws_vpc_security_group_ingress_rule" "allow_https_ipv4" {
  security_group_id = aws_security_group.ecs_security_group.id
  cidr_ipv4         = aws_vpc.main.cidr_block
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
} 

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.ecs_security_group.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}
