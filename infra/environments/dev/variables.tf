# Variables para el entorno de desarrollo
# Estas variables definen la configuración de los recursos en el entorno de desarrollo.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "hash_key" {
  description = "Nombre del atributo clave hash"
  type        = string
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
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

variable "range_key" {
  description = "Nombre del atributo clave range (opcional)"
  type        = string
  default     = null
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

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}