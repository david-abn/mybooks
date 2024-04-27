

variable "domain_name" {
  type    = string
  default = "mybooks.fit"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "Public Subnet CIDR values"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}



variable "private_subnet_cidrs" {
  type        = list(string)
  description = "Private Subnet CIDR values"
  default     = ["10.0.4.0/24", "10.0.5.0/24"]
}

variable "azs" {
  type        = list(string)
  description = "Availability Zones"
  default     = ["ap-southeast-2a", "ap-southeast-2b"]

}

# locals {
#   db           = aws_db_instance.mybooks_rds_instance
#   database_url = "mysql://${local.db.username}:${local.db.password}@${local.db.endpoint}"

#   container_env_vars = {
#     PORT         = "443"
#     DATABASE_URL = local.database_url
#   }
# }

variable "container_env_vars" {
  type = object({
    PORT         = string
    DATABASE_URL = string
  })
  description = "Environment variables for ECS container definition"
  default = {
    PORT         = "443"
    DATABASE_URL = "mysql://example_username:example_password@example_endpoint"
  }
}

# Triggers when aws_db_instance is created, updated our container_env_vars
resource "null_resource" "dummy" {
  triggers = {
    db_username = aws_db_instance.mybooks_rds_instance.username
    db_password = aws_db_instance.mybooks_rds_instance.password
    db_endpoint = aws_db_instance.mybooks_rds_instance.endpoint
  }
}

output "container_env_vars" {
  sensitive = true
  value = {
    PORT         = "443"
    DATABASE_URL = "mysql://${aws_db_instance.mybooks_rds_instance.username}:${aws_db_instance.mybooks_rds_instance.password}@${aws_db_instance.mybooks_rds_instance.endpoint}"
  }
}