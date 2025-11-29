variable "bucket_name" {
  type = string
}

variable "kms_key_alias" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}
