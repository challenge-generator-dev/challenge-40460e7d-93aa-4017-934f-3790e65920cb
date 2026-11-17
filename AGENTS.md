# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz**.

| | |
|---|---|
| Tema | Persistir ordenes en DynamoDB desde la interfaz |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | hexagonal/clean |
| Tiempo estimado | 10 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @aws-sdk/client-dynamodb 3.1171.0
- @aws-sdk/lib-dynamodb 3.1171.0
- @nestjs/common 10.4.22
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- class-transformer 0.5.1
- class-validator 0.15.1
- express 5.3.0
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @types/express 4.17.25
- @types/jest 29.5.14
- @types/node 22.20.5
- completed latest
- jest 29.7.0
- ts-jest 29.2.5
- typescript 5.7.3

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del entorno y creación de la estructura básica**: Proyecto React configurado con Vite 5 y estructura básica creada.
- **Fase 2 — Implementación de la lógica de negocio y persistencia en DynamoDB**: Lógica de negocio implementada para las operaciones CRUD de ordenes y datos persistidos en DynamoDB.
- **Fase 3 — Creación de pruebas de aceptación y versionado de la infraestructura**: Pruebas de aceptación creadas para las operaciones CRUD de ordenes y infraestructura versionada utilizando Terraform.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/src/application/services/order.service.ts` — La pieza p2 (Definición de lógica de negocio y puertos, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p3 (Implementación de adaptador de salida para DynamoDB, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/controllers/order.controller.ts` — La pieza p4 (Exposición de endpoints para operaciones CRUD, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/providers/dynamodb.provider.ts` — absorbida: fuga de la pieza p2
- [ ] `client/src/features/orders/hooks/useOrderState.ts` — La pieza p1 (Gestión de estado local con hooks, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).

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

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite@5` | Restriccion no verificada en chequeo estatico (manifest): exige `vite@5` |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (code): prohibe `@reduxjs/toolkit`, `createSlice`, `configureStore` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (1 de 30)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `client/src/features/orders/tests/order.e2e.test.ts`

### 2. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `client/src/features/orders/tests/order.e2e.test.tsx` — `DynamoOrderRepository.createOrder`
      Se invoca `createOrder` sobre `DynamoOrderRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/features/orders/tests/order.e2e.test.tsx` — `DynamoOrderRepository.updateOrderState`
      Se invoca `updateOrderState` sobre `DynamoOrderRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (44)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/domain/models/order.model.ts`
- `api/src/domain/models/create-order-request.model.ts`
- `api/src/domain/ports/order.repository.ts`
- `api/src/infrastructure/providers/dynamodb.provider.ts`
- `api/src/application/services/order.service.ts`
- `api/src/infrastructure/repositories/dynamo-order.repository.ts`
- `api/src/infrastructure/controllers/order.controller.ts`
- `api/src/acceptance/f1.test.ts`
- `api/src/acceptance/f2.test.ts`
- `api/src/app.module.ts`
- `api/src/main.ts`
- `client/src/main.tsx`
- `client/package.json`
- `client/tsconfig.json`
- `client/vite.config.ts`
- `client/index.html`
- `client/src/vite-env.d.ts`
- `client/src/features/orders/models/order.model.ts`
- `client/src/features/orders/models/create-order-request.model.ts`
- `client/src/features/orders/services/order.service.ts`
- `client/src/features/orders/repositories/dynamo-order.repository.ts`
- `client/src/features/orders/components/OrderForm.tsx`
- `client/src/features/orders/hooks/useOrderState.ts`
- `client/src/features/orders/components/OrderList.tsx`
- `client/src/features/orders/tests/order.e2e.test.tsx`
- `client/src/index.scss`
- `client/src/app/App.tsx`
- `client/src/features/orders/models.ts`
- `infra/versions.tf`
- `infra/providers.tf`
- `infra/modules/dynamodb/variables.tf`
- `infra/modules/dynamodb/outputs.tf`
- `infra/modules/dynamodb/orders.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/environments/dev/main.tf`
- `infra/environments/dev/orders_versioning.tf`
- `infra/README.md`
- `infra/modules/dynamodb/main.tf`
- `infra/environments/dev/variables.tf`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `api` (presente)
- `api/src/domain/models` (presente)
- `api/src/domain/ports` (presente)
- `api/src/application/services` (presente)
- `api/src/infrastructure/repositories` (presente)
- `api/src/infrastructure/controllers` (presente)
- `api/src/infrastructure/config` (ausente)
- `client` (presente)
- `client/src/features/orders` (presente)
- `client/src/features/orders/components` (presente)
- `client/src/features/orders/hooks` (presente)
- `client/src/features/orders/services` (presente)
- `client/src/features/orders/models` (presente)
- `client/src/features/orders/tests` (presente)
- `infra` (presente)
- `infra/modules/dynamodb` (presente)
- `infra/environments/dev` (presente)

## Verificacion

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **hexagonal/clean**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB desde la interfaz
- Mision: Gestionar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
