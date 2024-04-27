# Grab existing HZ from AWS
data "aws_route53_zone" "mybooks_hosted_zone" {
  name = var.domain_name
}

resource "aws_acm_certificate" "mybooks_certificate_request" {
  # Cert must be in us-east-1 for cloudfront
  provider                  = aws.aws-us-east-1
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"
}

resource "aws_route53_record" "mybooks_domain_dns_validation_arecord" {
  for_each = {
    for dvo in aws_acm_certificate.mybooks_certificate_request.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.mybooks_hosted_zone.zone_id
}

resource "aws_acm_certificate_validation" "mybooks_acm_validation" {
  provider                = aws.aws-us-east-1
  certificate_arn         = aws_acm_certificate.mybooks_certificate_request.arn
  validation_record_fqdns = [for record in aws_route53_record.mybooks_domain_dns_validation_arecord : record.fqdn]
}


resource "aws_route53_record" "mybooks_alb_arecord" {
  name    = "api.mybooks.fit"
  type    = "A"
  zone_id = data.aws_route53_zone.mybooks_hosted_zone.zone_id
  alias {
    name                   = aws_lb.ecs_alb.dns_name
    zone_id                = aws_lb.ecs_alb.zone_id
    evaluate_target_health = true
  }
}

