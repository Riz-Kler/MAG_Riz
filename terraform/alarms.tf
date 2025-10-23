resource "aws_cloudwatch_metric_alarm" "db_cpu_high" {
  alarm_name          = "magriz-rds-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 3
  metric_name         = "CPUUtilization"
  namespace           = "AWS/RDS"
  period              = 60
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "RDS CPU > 80% for 3 mins"
  dimensions          = { DBInstanceIdentifier = aws_db_instance.postgres.id }
}