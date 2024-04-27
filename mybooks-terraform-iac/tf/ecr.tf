resource "aws_ecr_repository" "mybooks_ecr_repo" {
  name                 = "mybooks-express-api-tf"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}