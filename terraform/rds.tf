resource "aws_db_instance" "postgres" {
  identifier              = "magriz-pg"
  engine                  = "postgres"
  engine_version          = "15"
  instance_class          = "db.t3.medium"
  allocated_storage       = 50
  username                = "magadmin"
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.db.name
  vpc_security_group_ids  = [aws_security_group.db.id]
  storage_encrypted       = true
  backup_retention_period = 7
  multi_az                = true
  skip_final_snapshot     = true
}

