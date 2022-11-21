data "terraform_remote_state" "vpc_prod_state" {
  backend = "s3"

  config = {
    encrypt = true
    region = "us-east-1"
    bucket = "sipasta-tfstate"
    key = "vpc-prod/terraform.tfstate"
  }
}
