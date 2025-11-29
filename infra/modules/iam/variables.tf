variable "name" {
  description = "Name prefix for the IAM role"
  type        = string
}

variable "assume_role_services" {
  description = "AWS services that can assume this role (e.g. ecs-tasks.amazonaws.com)"
  type        = list(string)
}

variable "managed_policy_arns" {
  description = "List of AWS managed/custom policy ARNs to attach"
  type        = list(string)
  default     = []
}
