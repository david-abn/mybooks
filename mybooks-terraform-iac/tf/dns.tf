resource "aws_route53_zone" "mybooks_hosted_zone" {
  name = var.domain_name
}

resource "aws_acm_certificate" "mybooks_certificate_request" {
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  tags = {
    Name : var.domain_name
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "domain_validation_record" {
  zone_id = aws_route53_zone.mybooks_hosted_zone.zone_id
  name    = aws_acm_certificate.mybooks_certificate_request.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.mybooks_certificate_request.domain_validation_options.0.resource_record_type
  records = [aws_acm_certificate.mybooks_certificate_request.domain_validation_options.0.resource_record_value]
}

resource "aws_acm_certificate_validation" "mybooks_certificate_validation" {
  certificate_arn         = aws_acm_certificate.mybooks_certificate_request.arn
  validation_record_fqdns = [aws_route53_record.domain_validation_record.fqdn]
}