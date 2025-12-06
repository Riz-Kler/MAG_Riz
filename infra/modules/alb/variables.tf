variable "name" { type = string }
variable "vpc_id" { type = string }
variable "public_subnet_ids" { type = list(string) }
variable "sg_id" { type = string }
variable "target_port" { type = number default = 80 }
variable "acm_cert_arn" { type = string }

variable "oidc_authorization_endpoint" { type = string }
variable "oidc_token_endpoint"         { type = string }
variable "oidc_user_info_endpoint"     { type = string }
variable "oidc_client_id"              { type = string }
variable "oidc_client_secret"          { type = string }
variable "oidc_issuer"                 { type = string }
