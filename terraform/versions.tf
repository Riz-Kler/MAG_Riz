terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }

  # Comment backend for tonight to avoid creds issues
  # backend "s3" {
  #   bucket         = "mag-riz-tf-state"
  #   key            = "envs/dev/terraform.tfstate"
  #   region         = "eu-west-2"
  #   # dynamodb_table is deprecated; use_lockfile is the new approach
  # }
}
