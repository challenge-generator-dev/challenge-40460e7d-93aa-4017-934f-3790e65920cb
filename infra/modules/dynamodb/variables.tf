# Variables para el módulo DynamoDB
# Este módulo define las variables necesarias para crear y configurar tablas DynamoDB.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (requerido si billing_mode es PROVISIONED)"
  type        = number
  default     = null
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (requerido si billing_mode es PROVISIONED)"
  type        = number
  default     = null
}

variable "hash_key" {
  description = "Nombre del atributo clave hash"
  type        = string
}

variable "range_key" {
  description = "Nombre del atributo clave range (opcional)"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales (opcional)"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    projection_type    = string
    read_capacity      = number
    write_capacity     = number
    non_key_attributes = list(string)
  }))
  default = []
}

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "ttl_attribute" {
  description = "Nombre del atributo para Time To Live (opcional)"
  type        = string
  default     = null
}

variable "stream_enabled" {
  description = "Habilitar streams para la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
}

variable "lambda_function_arn" {
  description = "ARN de la función Lambda que procesa los streams de DynamoDB"
  type        = string
  default     = null
}

variable "lambda_function_name" {
  description = "Nombre de la función Lambda que procesa los streams de DynamoDB"
  type        = string
  default     = null
}

variable "enable_additional_backup" {
  description = "Habilitar la creación de backups adicionales de la tabla de órdenes"
  type        = bool
  default     = false
}

variable "enable_audit" {
  description = "Habilitar la tabla de auditoría para registrar cambios en las órdenes"
  type        = bool
  default     = false
}