terraform {
  backend "s3" {
    bucket         = "magriz-terraform-state-uat"  # change
    key            = "uat/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "magriz-terraform-locks"      # change
    encrypt        = true
  }
}
