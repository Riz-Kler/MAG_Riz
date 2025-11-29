output "bucket_id" {
  value = aws_s3_bucket.secure.id
}

output "bucket_arn" {
  value = aws_s3_bucket.secure.arn
}

output "kms_key_arn" {
  value = aws_kms_key.this.arn
}
