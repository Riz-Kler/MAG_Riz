variable "name" {
  description = "Base name for the ECS resources (cluster, service, task)."
  type        = string
}

variable "region" {
  description = "AWS region for logging (CloudWatch)."
  type        = string
}

variable "image" {
  description = "Container image for the ECS task."
  type        = string
}

variable "container_port" {
  description = "Container port exposed by the application."
  type        = number
  default     = 80
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for the ECS service."
  type        = list(string)
}

variable "sg_id" {
  description = "Security group ID to attach to ECS tasks."
  type        = string
}

variable "target_group_arn" {
  description = "ALB target group ARN to register the service with."
  type        = string
}

variable "execution_role_arn" {
  description = "IAM role ARN used by ECS to pull images and send logs."
  type        = string
}

variable "task_role_arn" {
  description = "IAM role ARN assumed by the running task."
  type        = string
}

variable "log_group_name" {
  description = "CloudWatch Logs group name for container logs."
  type        = string
}

variable "cpu" {
  description = "Fargate task CPU units."
  type        = number
  default     = 256
}

variable "memory" {
  description = "Fargate task memory (MiB)."
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of running tasks in the ECS service."
  type        = number
  default     = 1
}
