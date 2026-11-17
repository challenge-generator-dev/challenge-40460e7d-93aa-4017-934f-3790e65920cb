# Infraestructura Terraform - Módulo DynamoDB

## Propósito

Este módulo define la infraestructura necesaria para persistir órdenes en DynamoDB. Proporciona un módulo reutilizable que puede ser consumido desde diferentes entornos (dev, staging, prod).

## Estructura del Proyecto

```
infra/
├── modules/
│   └── dynamodb/
│       ├── main.tf          # Definición del recurso DynamoDB
│       ├── variables.tf     # Variables de configuración
│       ├── outputs.tf       # Outputs expuestos
│       └── orders.tf        # Recursos de órdenes
├── environments/
│   └── dev/
│       ├── main.tf          # Configuración del entorno dev
│       ├── terraform.tfvars # Valores para dev
│       └── orders_versioning.tf # Control de versiones
├── versions.tf              # Versiones de Terraform y providers
└── providers.tf             # Configuración de providers
```

## Requisitos

- Terraform >= 1.9.0, < 2.0.0
- Provider AWS = 5.100.0

## Uso Básico

### Inicializar Terraform

```bash
cd infra
terraform init
```

### Validar la configuración

```bash
terraform validate
```

### Ver el plan de cambios

```bash
terraform plan -var-file=environments/dev/terraform.tfvars
```

### Aplicar los cambios

```bash
terraform apply -var-file=environments/dev/terraform.tfvars
```

### Destruir recursos

```bash
terraform destroy -var-file=environments/dev/terraform.tfvars
```

## Variables Principales

| Variable | Descripción | Tipo | Requerido |
|----------|-------------|------|-----------|
| `table_name` | Nombre de la tabla DynamoDB | string | sí |
| `billing_mode` | Modo de facturación (PROVISIONED o PAY_PER_REQUEST) | string | no |
| `hash_key` | Nombre del atributo clave hash | string | sí |
| `range_key` | Nombre del atributo clave range | string | no |
| `attributes` | Lista de atributos para la tabla | list(object) | sí |

## Outputs

El módulo expone los siguientes valores:

- `table_arn` - ARN de la tabla creada
- `table_name` - Nombre de la tabla
- `table_id` - ID de la tabla
- `stream_arn` - ARN del stream (si está habilitado)
- `stream_label` - Etiqueta del stream (si está habilitado)

## Validación Local

Para validar que el módulo funciona correctamente:

1. Asegúrate de tener credenciales AWS configuradas (variables de entorno o perfil)
2. Ejecuta `terraform init` en el directorio del módulo o entorno
3. Ejecuta `terraform validate` para verificar la sintaxis
4. Ejecuta `terraform plan` para ver los recursos que se crearán
5. Si el plan es correcto, ejecuta `terraform apply`

## Notas

- El módulo usa el provider AWS versión 5.100.0
- Por defecto usa facturación bajo demanda (PAY_PER_REQUEST)
- Los recursos se taggean automáticamente con metadatos del entorno
- Los logs de Terraform se almacenan remotamente via Terraform Cloud