# Outputs del módulo DynamoDB
# Estos outputs exponen información relevante de la tabla DynamoDB creada.

output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.arn
}

output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.name
}

output "table_id" {
  description = "ID de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.id
}

output "stream_arn" {
  description = "ARN del stream de la tabla DynamoDB (si está habilitado)"
  value       = aws_dynamodb_table.this.stream_arn
}

output "stream_label" {
  description = "Etiqueta del stream de la tabla DynamoDB (si está habilitado)"
  value       = aws_dynamodb_table.this.stream_label
}