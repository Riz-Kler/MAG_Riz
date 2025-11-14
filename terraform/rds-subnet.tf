resource "aws_db_subnet_group" "db" {
  name       = "db-subnets"
  subnet_ids = [aws_subnet.private_a.id] # add a second private subnet for Multi-AZ in real env
}