module "cloudfront-s3-website" {
  source  = "chgangaraju/cloudfront-s3-website/aws"
  version = "1.2.6"
  domain_name = var.domain_name
}

