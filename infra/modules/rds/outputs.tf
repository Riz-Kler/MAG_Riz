output "cluster_id" {
  description = "RDS cluster ID."
  value       = aws_rds_cluster.this.id
}

output "cluster_arn" {
  description = "RDS cluster ARN."
  value       = aws_rds_cluster.this.arn
}

output "endpoint" {
  description = "Writer endpoint for the Aurora cluster."
  value       = aws_rds_cluster.this.endpoint
}

output "reader_endpoint" {
  description = "Reader endpoint for the Aurora cluster."
  value       = aws_rds_cluster.this.reader_endpoint
}

output "port" {
  description = "Database port."
  value       = aws_rds_cluster.this.port
}
