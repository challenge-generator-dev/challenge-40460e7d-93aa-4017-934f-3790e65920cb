# Configuración principal del módulo DynamoDB
# Este archivo define el recurso de tabla DynamoDB con todas sus configuraciones

resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key
  range_key      = var.range_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name               = global_secondary_index.value.name
      hash_key           = global_secondary_index.value.hash_key
      range_key          = global_secondary_index.value.range_key
      projection_type    = global_secondary_index.value.projection_type
      read_capacity      = global_secondary_index.value.read_capacity
      write_capacity     = global_secondary_index.value.write_capacity
      non_key_attributes = global_secondary_index.value.non_key_attributes
    }
  }

  dynamic "ttl" {
    for_each = var.ttl_attribute != null ? [var.ttl_attribute] : []
    content {
      attribute_name = ttl.value
      enabled        = true
    }
  }

  stream_enabled = var.stream_enabled
  stream_view_type = var.stream_view_type

  tags = var.tags

  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }
}

resource "aws_dynamodb_table" "orders" {
  name           = "orders-${var.environment}"
  billing_mode   = var.billing_mode
  hash_key       = "orderId"
  range_key      = "customerId"

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "customerId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  attribute {
    name = "updatedAt"
    type = "S"
  }

  global_secondary_index {
    name               = "customer-status-index"
    hash_key           = "customerId"
    range_key          = "status"
    projection_type    = "ALL"
    read_capacity      = var.read_capacity
    write_capacity     = var.write_capacity
    non_key_attributes = ["orderId", "createdAt", "totalAmount"]
  }

  global_secondary_index {
    name               = "status-created-index"
    hash_key           = "status"
    range_key          = "createdAt"
    projection_type    = "ALL"
    read_capacity      = var.read_capacity
    write_capacity     = var.write_capacity
    non_key_attributes = ["orderId", "customerId", "totalAmount"]
  }

  ttl {
    attribute_name = "expirationTime"
    enabled        = true
  }

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  tags = merge(var.tags, {
    Name        = "orders-${var.environment}"
    Environment = var.environment
    ManagedBy   = "terraform"
    Project     = "order-management"
  })

  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }
}

resource "aws_dynamodb_resource_policy" "orders" {
  resource_arn = aws_dynamodb_table.orders.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "*"
        }
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.orders.arn
        Condition = {
          "IpAddress" = {
            "aws:SourceIp" = ["10.0.0.0/8", "172.16.0.0/12"]
          }
        }
      }
    ]
  })
}

resource "aws_sns_topic" "orders_stream" {
  name = "orders-stream-${var.environment}"
}

resource "aws_sns_topic_subscription" "orders_target" {
  topic_arn = aws_sns_topic.orders_stream.arn
  protocol  = "lambda"
  endpoint  = var.lambda_function_arn
}

resource "aws_lambda_permission" "sns_orders" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.orders_stream.arn
}