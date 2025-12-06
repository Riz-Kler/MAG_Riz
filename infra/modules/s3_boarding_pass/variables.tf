variable "name" {
  description = "Base name/prefix for the S3 bucket."
  type        = string
}

variable "env" {
  description = "Environment name (dev, uat, prod)."
  type        = string
}

variable "kms_key_id" {
  description = "KMS key ID used for SSE-KMS encryption."
  type        = string
}

variable "enable_versioning" {
  description = "Enable versioning on the bucket."
  type        = bool
  default     = true
}
