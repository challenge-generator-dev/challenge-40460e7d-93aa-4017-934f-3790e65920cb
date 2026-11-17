# Variables de entorno para el entorno de desarrollo
# Estas variables se cargan automáticamente cuando Terraform ejecuta en este directorio

# Configuración de la tabla DynamoDB de órdenes
table_name         = "orders-dev"
billing_mode       = "PAY_PER_REQUEST"
hash_key           = "orderId"
range_key          = "createdAt"

# Atributos de la tabla DynamoDB
attributes = [
  { name = "orderId", type = "S" },
  { name = "createdAt", type = "S" },
  { name = "customerId", type = "S" },
  { name = "status", type = "S" }
]

# Índices secundarios globales
global_secondary_indexes = [
  {
    name               = "customerId-index"
    hash_key           = "customerId"
    range_key          = "createdAt"
    projection_type    = "ALL"
    read_capacity      = 5
    write_capacity     = 5
    non_key_attributes = ["orderId", "status", "total"]
  },
  {
    name               = "status-index"
    hash_key           = "status"
    range_key          = "createdAt"
    projection_type    = "ALL"
    read_capacity      = 5
    write_capacity     = 5
    non_key_attributes = ["orderId", "customerId", "total"]
  }
]

# Configuración de Time To Live
ttl_attribute = "expiresAt"

# Habilitar streams para captura de cambios
stream_enabled  = true
stream_view_type = "NEW_AND_OLD_IMAGES"

# Etiquetas para identificación del entorno
tags = {
  Environment = "dev"
  Project     = "orders-management"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
}