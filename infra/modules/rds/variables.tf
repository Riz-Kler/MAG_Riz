variable "name" {
  description = "Base name for the RDS/Aurora cluster."
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for the DB subnet group."
  type        = list(string)
}

variable "sg_id" {
  description = "Security group ID for the database cluster."
  type        = string
}

variable "engine_version" {
  description = "Aurora PostgreSQL engine version."
  type        = string
  default     = "15.3"
}

variable "master_username" {
  description = "Master username for the database."
  type        = string
}

variable "master_password" {
  description = "Master password for the database."
  type        = string
  sensitive   = true
}

variable "database_name" {
  description = "Initial database name."
  type        = string
  default     = "mag_riz"
}

variable "kms_key_id" {
  description = "KMS key ID for storage encryption."
  type        = string
}
