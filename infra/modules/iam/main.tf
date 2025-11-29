locals {
  assume_role_policy = {
    Version = "2012-10-17"
    Statement = [
      for svc in var.assume_role_services : {
        Effect = "Allow"
        Principal = {
          Service = svc
        }
        Action = "sts:AssumeRole"
      }
    ]
  }
}

resource "aws_iam_role" "this" {
  name = var.name

  assume_role_policy = jsonencode(local.assume_role_policy)
}

resource "aws_iam_role_policy_attachment" "managed" {
  count      = length(var.managed_policy_arns)
  role       = aws_iam_role.this.name
  policy_arn = var.managed_policy_arns[count.index]
}
