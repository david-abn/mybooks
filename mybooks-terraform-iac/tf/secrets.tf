# After the secret is initially created, we will need to manually input the values
# in the AWS console. Once completed, retry an ECS deployment.  

resource "aws_secretsmanager_secret" "google_clientid_secret" {
  name        = "GOOGLE_CLIENT_ID"
  description = "Secret for Google client ID"
}

resource "aws_secretsmanager_secret" "google_clientsecret_secret" {
  name        = "GOOGLE_CLIENT_SECRET"
  description = "Secret for Google client secret"
}

resource "aws_secretsmanager_secret" "session_secret" {
  name        = "SESSION_SECRET"
  description = "Secret for ExpressJS session"
}