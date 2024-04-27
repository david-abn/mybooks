# Generate a random password
resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}


# Generate a random password and store it in the Secrets Manager secret
resource "aws_secretsmanager_secret_version" "db_password_value" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
}

resource "aws_db_instance" "mybooks_rds_instance" {
  allocated_storage = 10
  storage_type      = "gp2"
  engine            = "mysql"
  instance_class    = "db.t3.micro"
  identifier        = "mydb"
  username          = "dbuser"
  password          = aws_secretsmanager_secret_version.db_password_value.secret_string

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.my_db_subnet_group.name

  backup_retention_period = 7                     # Number of days to retain automated backups
  backup_window           = "16:00-17:00"         # Preferred UTC backup window (hh24:mi-hh24:mi format)
  maintenance_window      = "mon:17:00-mon:17:30" # Preferred UTC maintenance window

  # Enable automated backups
  skip_final_snapshot       = false
  final_snapshot_identifier = "db-snap"
}
