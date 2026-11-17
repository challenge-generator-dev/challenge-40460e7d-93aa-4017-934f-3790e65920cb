# Configuración del entorno de desarrollo
# Este archivo orquesta la creación de recursos AWS para el entorno de desarrollo

terraform {
  # Configuración de backend para estado remoto
  backend "s3" {
    bucket         = "terraform-state-orders-dev"
    key            = "environments/dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# Módulo DynamoDB para la tabla de órdenes
module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  # Parámetros requeridos de la tabla
  table_name = var.table_name
  hash_key   = var.hash_key
  attributes = var.attributes

  # Argumento requerido por el módulo
  environment = "dev"

  # Configuración de facturación
  billing_mode = var.billing_mode

  # Capacidad provisionada (solo si billing_mode es PROVISIONED)
  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null

  # Clave range opcional
  range_key = var.range_key

  # Índices secundarios globales
  global_secondary_indexes = var.global_secondary_indexes

  # Configuración de TTL
  ttl_attribute = var.ttl_attribute

  # Streams para captura de cambios
  stream_enabled  = var.stream_enabled
  stream_view_type = var.stream_view_type

  # Etiquetas
  tags = var.tags
}

# Output para consumo en otros módulos
output "orders_table_name" {
  description = "Nombre de la tabla de órdenes en entorno dev"
  value       = module.dynamodb_orders.table_name
}

output "orders_table_arn" {
  description = "ARN de la tabla de órdenes en entorno dev"
  value       = module.dynamodb_orders.table_arn
}

output "orders_stream_arn" {
  description = "ARN del stream de la tabla de órdenes"
  value       = module.dynamodb_orders.stream_arn
}

# Variables locales para el entorno
locals {
  environment_name = "dev"
  region           = "us-east-1"

  # Nombre del recurso para políticas y permisos
  resource_prefix = "orders-${local.environment_name}"

  # Configuración de retención de datos
  retention_days = 30

  # Configuración de replicación para alta disponibilidad
  enable_replication = false
  replication_regions = []

  # Configuración de backups
  backup_retention_days = 7
  enable_point_in_time_recovery = true

  # Configuración de monitoreo
  enable_monitoring = true
  monitoring_interval = 5

  # Configuración de alertas
  alert_thresholds = {
    read_throttle_percent  = 10
    write_throttle_percent = 10
    error_rate_percent     = 5
    latency_p99_ms         = 1000
  }

  # Tags comunes para todos los recursos
  common_tags = {
    Environment = local.environment_name
    Region      = local.region
    ManagedBy   = "Terraform"
    Project     = "OrdersManagement"
    Owner       = "platform-team"
  }

  # Configuración de seguridad
  enable_encryption_at_rest = true
  enable_server_side_encryption = true
  sse_algorithm = "AES256"

  # Configuración de acceso
  enable_public_access = false
  allowed_cidr_blocks = ["10.0.0.0/8"]
}