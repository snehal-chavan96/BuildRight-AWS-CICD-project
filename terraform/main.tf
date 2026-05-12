# The main.tf file can be used to hold local variables, 
# or specific core configurations.
# In this modular setup, most resources are organized by their service (vpc, ec2, s3, etc.).

locals {
  common_tags = {
    Project     = var.project_name
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
