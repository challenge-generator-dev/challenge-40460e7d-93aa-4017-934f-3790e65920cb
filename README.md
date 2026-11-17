# Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz

El sistema permite a los usuarios gestionar ordenes a través de una interfaz construida en React. Las ordenes se persisten en DynamoDB. El objetivo es implementar operaciones CRUD (crear, leer, actualizar, eliminar) de ordenes en DynamoDB desde la interfaz y versionar la infraestructura utilizando Terraform.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración del entorno y creación de la estructura básica

**Objetivo:** Configurar el entorno de desarrollo y crear la estructura básica del proyecto.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto React utilizando Vite 5 como herramienta de build.
- Crear la estructura básica del proyecto incluyendo las rutas y componentes necesarios para la gestión de ordenes.

**Entregable:** Proyecto React configurado con Vite 5 y estructura básica creada.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Vite 5 para la configuración del proyecto React.
- Creación de componentes y rutas en React.

</details>

### Fase 2: Implementación de la lógica de negocio y persistencia en DynamoDB

**Objetivo:** Implementar la lógica de negocio para las operaciones CRUD de ordenes y persistir los datos en DynamoDB.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementar la lógica de negocio para las operaciones CRUD de ordenes.
- Configurar y utilizar DynamoDB para persistir los datos de las ordenes.
- Utilizar hooks para manejar el estado local en lugar de Redux Toolkit.

**Entregable:** Lógica de negocio implementada para las operaciones CRUD de ordenes y datos persistidos en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Implementación de la lógica de negocio en React.
- Uso de DynamoDB para la persistencia de datos.
- Manejo del estado local con hooks.

</details>

### Fase 3: Creación de pruebas de aceptación y versionado de la infraestructura

**Objetivo:** Crear pruebas de aceptación para las operaciones CRUD de ordenes y versionar la infraestructura utilizando Terraform.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Crear pruebas de aceptación para las operaciones CRUD de ordenes.
- Versionar la infraestructura utilizando Terraform.

**Entregable:** Pruebas de aceptación creadas para las operaciones CRUD de ordenes y infraestructura versionada utilizando Terraform.

<details>
<summary>Pistas de conocimiento</summary>

- Creación de pruebas de aceptación en React.
- Uso de Terraform para el versionado de la infraestructura.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en un proyecto React?
- **paraQueSirve**: ¿Para qué sirve persistir datos en DynamoDB desde una interfaz React?
- **comoSeUsa**: ¿Cómo se utiliza DynamoDB para persistir datos en un proyecto React?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al persistir datos en DynamoDB desde una interfaz React?
- **queDecisionesImplica**: ¿Qué decisiones implica el versionado de la infraestructura utilizando Terraform en un proyecto React?

## Criterios de Evaluacion

- Configuración correcta del proyecto React utilizando Vite 5.
- Implementación de la lógica de negocio para las operaciones CRUD de ordenes.
- Persistencia correcta de datos en DynamoDB.
- Manejo del estado local utilizando hooks en lugar de Redux Toolkit.
- Creación de pruebas de aceptación para las operaciones CRUD de ordenes.
- Versionado correcto de la infraestructura utilizando Terraform.

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración del entorno y creación de la estructura básica | Gestión de estado local con hooks | `client/src/features/orders/hooks/useOrderState.ts:useOrderState` | El proyecto React está configurado con Vite 5 y la estructura básica está creada.; Los modelos y puertos para las órdenes están definidos y listos para ser implementados. | — | — |
| f1 — Configuración del entorno y creación de la estructura básica | Definición de lógica de negocio y puertos | `api/src/application/services/order.service.ts:OrderService` | El proyecto React está configurado con Vite 5 y la estructura básica está creada.; Los modelos y puertos para las órdenes están definidos y listos para ser implementados. | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Implementación de la lógica de negocio y persistencia en DynamoDB | Implementación de adaptador de salida para DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository` | La lógica de negocio para las operaciones CRUD de órdenes está implementada y funciona correctamente.; Los datos se persisten en DynamoDB mediante un adaptador de salida. | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Implementación de la lógica de negocio y persistencia en DynamoDB | Exposición de endpoints para operaciones CRUD | `api/src/infrastructure/controllers/order.controller.ts:OrderController` | La lógica de negocio para las operaciones CRUD de órdenes está implementada y funciona correctamente.; Los datos se persisten en DynamoDB mediante un adaptador de salida. | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Implementación de la lógica de negocio y persistencia en DynamoDB | Declaración de tabla DynamoDB en Terraform | — | La lógica de negocio para las operaciones CRUD de órdenes está implementada y funciona correctamente.; Los datos se persisten en DynamoDB mediante un adaptador de salida. | — | — |
| f3 — Creación de pruebas de aceptación y versionado de la infraestructura | Pruebas de aceptación e2e para operaciones CRUD | `client/src/features/orders/hooks/useOrderState.ts:OrderE2ETest` | Las pruebas de aceptación para las operaciones CRUD de órdenes están implementadas y cubren casos de éxito, error y borde.; La infraestructura de DynamoDB está versionada con Terraform y lista para ser desplegada. | — | — |
| f3 — Creación de pruebas de aceptación y versionado de la infraestructura | Versionado de infraestructura con Terraform | — | Las pruebas de aceptación para las operaciones CRUD de órdenes están implementadas y cubren casos de éxito, error y borde.; La infraestructura de DynamoDB está versionada con Terraform y lista para ser desplegada. | — | — |

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite@5` | Restriccion no verificada en chequeo estatico (manifest): exige `vite@5` |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (code): prohibe `@reduxjs/toolkit`, `createSlice`, `configureStore` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `PUT /orders/:id/state`
  - `GET /orders/:id`
  - `DELETE /orders/:id`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
