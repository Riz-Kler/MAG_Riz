terraform {
  backend "s3" {
    bucket         = "magriz-terraform-state-prod"  # change
    key            = "prod/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "magriz-terraform-locks"      # change
    encrypt        = true
  }
}
