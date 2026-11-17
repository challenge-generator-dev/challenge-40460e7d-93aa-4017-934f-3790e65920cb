# Versionado de infraestructura para el entorno de desarrollo
# Implementa control de versiones de la infraestructura usando Terraform Cloud

# Configuración de workspace para versionado
terraform {
  # Workspaces permiten aislar estados entre versiones
  # El nombre del workspace se usa como identificador de versión
}

# Recurso para versionado de la tabla DynamoDB
# Utiliza tags para identificar la versión de infraestructura
resource "aws_dynamodb_table" "orders_versioned" {
  count = var.enable_versioning ? 1 : 0

  name           = "${var.table_name}-v${var.infrastructure_version}"
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

  ttl {
    attribute_name = var.ttl_attribute
    enabled        = true
  }

  stream_enabled  = var.stream_enabled
  stream_view_type = var.stream_view_type

  tags = merge(var.tags, {
    Version              = var.infrastructure_version
    VersionedResource    = "true"
    PreviousVersion      = var.previous_version
    MigrationRequired    = var.migration_required ? "true" : "false"
  })
}

# Recurso para registrar versiones de infraestructura
resource "aws_dynamodb_table" "infrastructure_versions" {
  name           = "infrastructure-versions"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "version"
  range_key      = "environment"

  attribute {
    name = "version"
    type = "S"
  }

  attribute {
    name = "environment"
    type = "S"
  }

  attribute {
    name = "deployedAt"
    type = "S"
  }

  global_secondary_index {
    name               = "environment-deployedAt-index"
    hash_key           = "environment"
    range_key          = "deployedAt"
    projection_type    = "ALL"
    read_capacity      = 2
    write_capacity     = 2
  }

  tags = {
    Environment = "dev"
    ManagedBy   = "terraform"
    Purpose     = "infrastructure-versioning"
  }
}

# Output para consultar versiones activas
output "current_infrastructure_version" {
  description = "Versión actual de la infraestructura"
  value       = var.infrastructure_version
}

output "previous_infrastructure_version" {
  description = "Versión anterior de la infraestructura"
  value       = var.previous_version
}

output "versioned_table_name" {
  description = "Nombre de la tabla versionada"
  value       = var.enable_versioning ? aws_dynamodb_table.orders_versioned[0].name : null
}

output "migration_required" {
  description = "Indica si se requiere migración de datos"
  value       = var.migration_required
}

# Variable para controlar versionado
variable "enable_versioning" {
  description = "Habilitar versionado de la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "infrastructure_version" {
  description = "Versión de la infraestructura a desplegar"
  type        = string
  default     = "1.0.0"
}

variable "previous_version" {
  description = "Versión anterior de la infraestructura (para referencia)"
  type        = string
  default     = ""
}

variable "migration_required" {
  description = "Indica si la versión actual requiere migración de datos"
  type        = bool
  default     = false
}