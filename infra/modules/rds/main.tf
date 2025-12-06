resource "aws_rds_cluster" "this" {
  cluster_identifier = "${var.name}-cluster"
  engine             = "aurora-postgresql"
  engine_version     = var.engine_version

  master_username = var.master_username
  master_password = var.master_password

  database_name = var.database_name

  vpc_security_group_ids = [var.sg_id]
  db_subnet_group_name   = aws_db_subnet_group.this.name

  storage_encrypted = true
  kms_key_id        = var.kms_key_id
}

resource "aws_db_subnet_group" "this" {
  name       = "${var.name}-subnet-group"
  subnet_ids = var.private_subnet_ids
}
