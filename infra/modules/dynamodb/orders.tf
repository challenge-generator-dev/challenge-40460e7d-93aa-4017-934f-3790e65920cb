# Módulo DynamoDB para la tabla de órdenes
# Este módulo crea una tabla DynamoDB para almacenar órdenes con los atributos necesarios.
# Proporciona outputs para acceder a los recursos definidos en main.tf

# Output que referencia la tabla de órdenes definida en main.tf
# No se crea un nuevo recurso, se utiliza el ya definido en main.tf

output "orders_table_name" {
  description = "Nombre de la tabla de órdenes"
  value       = aws_dynamodb_table.orders.name
}

output "orders_table_arn" {
  description = "ARN de la tabla de órdenes"
  value       = aws_dynamodb_table.orders.arn
}

output "orders_table_stream_arn" {
  description = "ARN del stream de la tabla de órdenes"
  value       = aws_dynamodb_table.orders.stream_arn
}

output "orders_stream_topic_arn" {
  description = "ARN del topic SNS para el stream de órdenes"
  value       = aws_sns_topic.orders_stream.arn
}

output "orders_stream_topic_name" {
  description = "Nombre del topic SNS para el stream de órdenes"
  value       = aws_sns_topic.orders_stream.name
}

# Referencia a la tabla de órdenes definida en main.tf
# El recurso aws_dynamodb_table.orders ya está creado en main.tf
# Aquí solo referenciamos ese recurso para obtener sus atributos

resource "aws_dynamodb_table" "orders_reference" {
  # Este es un recurso de solo lectura que referencia la tabla real
  # No crea recursos nuevos, solo permite referenciar los atributos de la tabla
  name           = aws_dynamodb_table.orders.name
  billing_mode   = aws_dynamodb_table.orders.billing_mode
  hash_key       = aws_dynamodb_table.orders.hash_key
  range_key      = aws_dynamodb_table.orders.range_key

  # Los atributos se omiten porque solo necesitamos referenciar la tabla existente

  # Tags de solo lectura
  tags = aws_dynamodb_table.orders.tags

  # Lifecycle para evitar modificaciones
  lifecycle {
    ignore_changes = all
  }
}

# Recurso para tabla de auditoría de órdenes
# Recurso adicional específico para auditoría que no existe en main.tf
resource "aws_dynamodb_table" "orders_audit" {
  count = var.enable_audit != null && var.enable_audit ? 1 : 0

  name           = "orders-audit-${var.environment}"
  billing_mode   = var.billing_mode
  hash_key       = "auditId"
  range_key      = "timestamp"

  attribute {
    name = "auditId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "action"
    type = "S"
  }

  global_secondary_index {
    name               = "order-action-index"
    hash_key           = "orderId"
    range_key          = "action"
    projection_type    = "ALL"
    read_capacity      = var.read_capacity
    write_capacity     = var.write_capacity
    non_key_attributes = ["auditId", "timestamp", "userId"]
  }

  ttl {
    attribute_name = "expirationTime"
    enabled        = true
  }

  tags = merge(var.tags, {
    Name        = "orders-audit-${var.environment}"
    Environment = var.environment
    Type        = "audit"
  })

  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }
}

# Output para la tabla de auditoría
output "orders_audit_table_name" {
  description = "Nombre de la tabla de auditoría de órdenes"
  value       = var.enable_audit != null && var.enable_audit ? aws_dynamodb_table.orders_audit[0].name : null
}

output "orders_audit_table_arn" {
  description = "ARN de la tabla de auditoría de órdenes"
  value       = var.enable_audit != null && var.enable_audit ? aws_dynamodb_table.orders_audit[0].arn : null
}