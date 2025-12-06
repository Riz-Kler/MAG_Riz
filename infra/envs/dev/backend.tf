terraform {
  backend "s3" {
    bucket         = "magriz-terraform-state-dev"  # change
    key            = "dev/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "magriz-terraform-locks"      # change
    encrypt        = true
  }
}
