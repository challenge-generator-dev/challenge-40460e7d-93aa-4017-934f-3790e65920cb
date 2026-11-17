# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/application/services/order.service.ts` — La pieza p2 (Definición de lógica de negocio y puertos, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p3 (Implementación de adaptador de salida para DynamoDB, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/controllers/order.controller.ts` — La pieza p4 (Exposición de endpoints para operaciones CRUD, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/providers/dynamodb.provider.ts` — absorbida: fuga de la pieza p2
- `client/src/features/orders/hooks/useOrderState.ts` — La pieza p1 (Gestión de estado local con hooks, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `client/src/features/orders/tests/order.e2e.test.ts`

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `client/src/features/orders/tests/order.e2e.test.tsx` — `DynamoOrderRepository.createOrder`: Se invoca `createOrder` sobre `DynamoOrderRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/features/orders/tests/order.e2e.test.tsx` — `DynamoOrderRepository.updateOrderState`: Se invoca `updateOrderState` sobre `DynamoOrderRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y creación de la estructura básica — objetivo: Configurar el entorno de desarrollo y crear la estructura básica del proyecto. — entregable (NO resolver): Proyecto React configurado con Vite 5 y estructura básica creada.
- Fase 2: Implementación de la lógica de negocio y persistencia en DynamoDB — objetivo: Implementar la lógica de negocio para las operaciones CRUD de ordenes y persistir los datos en DynamoDB. — entregable (NO resolver): Lógica de negocio implementada para las operaciones CRUD de ordenes y datos persistidos en DynamoDB.
- Fase 3: Creación de pruebas de aceptación y versionado de la infraestructura — objetivo: Crear pruebas de aceptación para las operaciones CRUD de ordenes y versionar la infraestructura utilizando Terraform. — entregable (NO resolver): Pruebas de aceptación creadas para las operaciones CRUD de ordenes y infraestructura versionada utilizando Terraform.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1171.0",
    "@aws-sdk/lib-dynamodb": "3.1171.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/jest": "29.5.14",
    "@types/node": "22.20.5",
    "completed": "latest",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/models/order.model.ts ===
import { IsArray, IsDateString, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItem {
  @IsString()
  productId: string;

  @IsString()
  quantity: number;

  constructor(productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

export class Order {
  @IsString()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @IsEnum(['pending', 'completed', 'cancelled'])
  state: 'pending' | 'completed' | 'cancelled';

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  constructor(
    id: string,
    items: OrderItem[],
    state: 'pending' | 'completed' | 'cancelled',
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.items = items;
    this.state = state;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

// === ARCHIVO: api/src/domain/models/create-order-request.model.ts ===
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order.model';

export class CreateOrderRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  constructor(items: OrderItem[]) {
    this.items = items;
  }
}

// === ARCHIVO: api/src/domain/ports/order.repository.ts ===
import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';

export interface OrderRepository {
  createOrder(createOrderRequest: CreateOrderRequest): Promise<Order>;
  updateOrderState(id: string, state: 'pending' | 'completed' | 'cancelled'): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  deleteOrder(id: string): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/providers/dynamodb.provider.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class DynamoDBProvider {
  private static instance: DynamoDBDocumentClient;

  static getInstance(): DynamoDBDocumentClient {
    throw new Error('TODO(reto): getInstance');
  }
}

// === ARCHIVO: api/src/application/services/order.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { OrderRepository } from '../../domain/ports/order.repository';

const VALID_STATE_TRANSITIONS: Record<string, string[]> = {
  pending: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY') private readonly orderRepository: OrderRepository
  ) {}

  async create(order: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async updateState(id: string, state: string): Promise<Order> {
    throw new Error('TODO(reto): updateState');
  }

  async getOrder(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): getOrder');
  }

  async deleteOrder(id: string): Promise<void> {
    throw new Error('TODO(reto): deleteOrder');
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/dynamo-order.repository.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order.repository';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { DynamoDBProvider } from '../providers/dynamodb.provider';
import { PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoOrderRepository implements OrderRepository {
  private readonly tableName = process.env.ORDERS_TABLE || 'orders';
  private readonly docClient = DynamoDBProvider.getInstance();

  async createOrder(createOrderRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): createOrder');
  }

  async updateOrderState(id: string, state: 'pending' | 'completed' | 'cancelled'): Promise<Order> {
    throw new Error('TODO(reto): updateOrderState');
  }

  async getOrder(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): getOrder');
  }

  async deleteOrder(id: string): Promise<void> {
    throw new Error('TODO(reto): deleteOrder');
  }

  private generateId(): string {
    throw new Error('TODO(reto): generateId');
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from '../../application/services/order.service';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: any, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id/state')
  async updateOrderState(@Param('id') id: string, @Body() body: any, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Put');
  }

  @Get(':id')
  async getOrder(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Get');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Delete');
  }

  private orderToResponse(order: Order): any {
    throw new Error('TODO(reto): orderToResponse');
  }
}

// === ARCHIVO: api/src/acceptance/f1.test.ts ===
import { OrderService } from '../application/services/order.service';
import { OrderRepository } from '../domain/ports/order.repository';
import { Order } from '../domain/models/order.model';
import { CreateOrderRequest } from '../domain/models/create-order-request.model';

describe('OrderService - Phase f1', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    mockOrderRepository = {
      createOrder: jest.fn(),
      updateOrderState: jest.fn(),
      getOrder: jest.fn(),
      deleteOrder: jest.fn(),
    };
    orderService = new OrderService(mockOrderRepository);
  });

  describe('should create an order', () => {
    it('given A valid order creation request; when create is called; then The order is created and returned', async () => {
      const items = [{ productId: 'prod-123', quantity: 2 }];
      const createRequest = new CreateOrderRequest(items);
      
      const expectedOrder = new Order(
        'order-uuid',
        items,
        'pending',
        '2024-01-01T00:00:00.000Z',
        '2024-01-01T00:00:00.000Z'
      );

      mockOrderRepository.createOrder.mockResolvedValue(expectedOrder);

      const result = await orderService.create(createRequest);

      expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(createRequest);
      expect(result).toEqual(expectedOrder);
    });
  });

  describe('should reject invalid state transition', () => {
    it('given An order in state "delivered"; when updateState is called with "pending"; then An error is thrown', async () => {
      const orderId = 'order-123';
      const existingOrder = new Order(
        orderId,
        [{ productId: 'prod-1', quantity: 1 }],
        'completed',
        '2024-01-01T00:00:00.000Z',
        '2024-01-01T00:00:00.000Z'
      );

      mockOrderRepository.getOrder.mockResolvedValue(existingOrder);

      await expect(orderService.updateState(orderId, 'pending')).rejects.toThrow(
        `Invalid state transition from 'completed' to 'pending'`
      );
    });
  });
});

// === ARCHIVO: api/src/acceptance/f2.test.ts ===
import { DynamoOrderRepository } from '../infrastructure/repositories/dynamo-order.repository';
import { OrderController } from '../infrastructure/controllers/order.controller';
import { OrderService } from '../application/services/order.service';
import { Order } from '../domain/models/order.model';
import { CreateOrderRequest } from '../domain/models/create-order-request.model';

describe('DynamoOrderRepository (p3)', () => {
  let repository: DynamoOrderRepository;
  let mockDocClient: any;

  beforeEach(() => {
    mockDocClient = {
      send: jest.fn(),
    };
    
    jest.spyOn(require('../infrastructure/providers/dynamodb.provider'), 'DynamoDBProvider')
      .mockImplementation(() => ({
        getInstance: () => mockDocClient,
      }));
    
    repository = new DynamoOrderRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should create an order in DynamoDB', () => {
    it('given A valid order; when create is called; then The order is persisted in DynamoDB', async () => {
      const createOrderRequest = new CreateOrderRequest([
        { productId: 'prod-1', quantity: 2 },
      ]);

      mockDocClient.send.mockResolvedValue({});

      const result = await repository.createOrder(createOrderRequest);

      expect(mockDocClient.send).toHaveBeenCalled();
      const putCommand = mockDocClient.send.mock.calls[0][0];
      expect(putCommand.input.TableName).toBe('orders');
      expect(putCommand.input.Item).toBeDefined();
      expect(putCommand.input.Item.state).toBe('pending');
      expect(result).toBeInstanceOf(Order);
      expect(result.id).toContain('order_');
    });
  });

  describe('should handle DynamoDB errors when creating an order', () => {
    it('given A DynamoDB error; when create is called; then A persistence error is thrown', async () => {
      const createOrderRequest = new CreateOrderRequest([
        { productId: 'prod-1', quantity: 2 },
      ]);

      mockDocClient.send.mockRejectedValue(new Error('DynamoDB connection failed'));

      await expect(repository.createOrder(createOrderRequest)).rejects.toThrow('Failed to create order');
    });
  });

  describe('should update an order state in DynamoDB', () => {
    it('given An existing order; when updateState is called; then The order state is updated in DynamoDB', async () => {
      const orderId = 'order-123';
      const newState = 'completed';

      mockDocClient.send.mockResolvedValue({
        Attributes: {
          id: orderId,
          items: [{ productId: 'prod-1', quantity: 2 }],
          state: newState,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      });

      const result = await repository.updateOrderState(orderId, newState);

      expect(mockDocClient.send).toHaveBeenCalled();
      const updateCommand = mockDocClient.send.mock.calls[0][0];
      expect(updateCommand.input.TableName).toBe('orders');
      expect(updateCommand.input.Key).toEqual({ id: orderId });
      expect(result).toBeInstanceOf(Order);
      expect(result.state).toBe(newState);
    });
  });
});

describe('OrderController (p4)', () => {
  let controller: OrderController;
  let mockOrderService: jest.Mocked<OrderService>;
  let mockResponse: any;

  beforeEach(() => {
    mockOrderService = {
      create: jest.fn(),
      updateState: jest.fn(),
      getOrder: jest.fn(),
      deleteOrder: jest.fn(),
    } as any;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    controller = new OrderController(mockOrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should create an order via HTTP', () => {
    it('given A valid order creation request; when POST /orders is called; then The order is created and returned with status 201', async () => {
      const order = new Order(
        'order-123',
        [{ productId: 'prod-1', quantity: 2 }],
        'pending',
        '2024-01-01T00:00:00.000Z',
        '2024-01-01T00:00:00.000Z',
      );

      mockOrderService.create.mockResolvedValue(order);

      await controller.createOrder(
        { items: [{ productId: 'prod-1', quantity: 2 }] },
        mockResponse,
      );

      expect(mockOrderService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'order-123',
          state: 'pending',
        }),
      );
    });
  });

  describe('should reject invalid order creation via HTTP', () => {
    it('given An invalid order creation request; when POST /orders is called; then A 400 error is returned', async () => {
      await controller.createOrder({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.any(String) }),
      );
    });
  });

  describe('should update an order state via HTTP', () => {
    it('given An existing order and a valid state transition; when PATCH /orders/:id/state is called; then The order state is updated and returned with status 200', async () => {
      const order = new Order(
        'order-123',
        [{ productId: 'prod-1', quantity: 2 }],
        'completed',
        '2024-01-01T00:00:00.000Z',
        '2024-01-02T00:00:00.000Z',
      );

      mockOrderService.updateState.mockResolvedValue(order);

      await controller.updateOrderState('order-123', { state: 'completed' }, mockResponse);

      expect(mockOrderService.updateState).toHaveBeenCalledWith('order-123', 'completed');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'order-123',
          state: 'completed',
        }),
      );
    });
  });
});

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { OrderService } from './application/services/order.service';
import { OrderController } from './infrastructure/controllers/order.controller';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { DynamoDBProvider } from './infrastructure/providers/dynamodb.provider';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    DynamoOrderRepository,
    DynamoDBProvider,
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/main.ts ===
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "@testing-library/react": "16.3.3",
    "@testing-library/user-event": "14.6.12",
    "axios": "1.21.1",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "vitest": "4.0.18"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/features/orders/models/order.model.ts ===
export type OrderState = 'pending' | 'completed' | 'cancelled';

export interface OrderItem {
    productId: string;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    state: OrderState;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderRequest {
    items: Array<{ productId: string; quantity: number }>;
}

// === ARCHIVO: client/src/features/orders/models/create-order-request.model.ts ===
export interface CreateOrderRequest {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
}

// === ARCHIVO: client/src/features/orders/services/order.service.ts ===
import axios from 'axios';
import { Order, OrderState } from '../models';

const API_BASE_URL = 'http://localhost:3000';

export class OrderService {
    async getOrder(id: string): Promise<Order> {
        try {
            const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw new Error('Failed to fetch order');
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/orders/${id}`);
        } catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Failed to delete order');
        }
    }
}

// === ARCHIVO: client/src/features/orders/repositories/dynamo-order.repository.ts ===
import { Order, OrderState } from '../models';

export interface OrderRepository {
    getOrder(id: string): Promise<Order>;
    deleteOrder(id: string): Promise<void>;
}

export class DynamoOrderRepository implements OrderRepository {
    private readonly tableName: string;
    private readonly documentClient: any;

    constructor(documentClient: any, tableName: string = 'Orders') {
        if (!documentClient) {
            throw new Error('DocumentClient is required');
        }
        this.documentClient = documentClient;
        this.tableName = tableName;
    }

    async getOrder(id: string): Promise<Order> {
        try {
            const result = await this.documentClient.get({
                TableName: this.tableName,
                Key: { id },
            }).promise();

            if (!result.Item) {
                throw new Error('Order not found');
            }

            return result.Item as Order;
        } catch (error) {
            console.error('Error fetching order from DynamoDB:', error);
            throw new Error('Failed to fetch order from DynamoDB');
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await this.documentClient.delete({
                TableName: this.tableName,
                Key: { id },
            }).promise();
        } catch (error) {
            console.error('Error deleting order from DynamoDB:', error);
            throw new Error('Failed to delete order from DynamoDB');
        }
    }
}

// === ARCHIVO: client/src/features/orders/components/OrderForm.tsx ===
import React from 'react';
import { useOrderState } from '../hooks/useOrderState';
import { OrderService } from '../services/order.service';
import { CreateOrderRequest, Order } from '../models';

interface OrderFormProps {
    onSubmit: (request: CreateOrderRequest) => Promise<Order>;
    initialData?: CreateOrderRequest;
}

const orderService = new OrderService();

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, initialData }) => {
    const { createOrder, isLoading, error } = useOrderState(orderService);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const items: Array<{ productId: string; quantity: number }> = [];
        
        const productIds = formData.getAll('productId');
        const quantities = formData.getAll('quantity');
        
        for (let i = 0; i < productIds.length; i++) {
            items.push({
                productId: productIds[i] as string,
                quantity: Number(quantities[i]) || 1
            });
        }

        const request: CreateOrderRequest = { items };
        
        try {
            await createOrder(request);
            if (onSubmit) {
                await onSubmit(request);
            }
        } catch (err) {
            console.error('Error submitting order:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div className="item-row">
                <input
                    type="text"
                    name="productId"
                    placeholder="Product ID"
                    className="border p-2 flex-1"
                    required
                    defaultValue={initialData?.items?.[0]?.productId || ''}
                />
                <input
                    type="number"
                    name="quantity"
                    min="1"
                    className="border p-2 w-20"
                    required
                    defaultValue={initialData?.items?.[0]?.quantity || 1}
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-500 text-white p-2 disabled:opacity-50"
                >
                    {isLoading ? 'Submitting...' : 'Submit Order'}
                </button>
            </div>
        </form>
    );
};

// === ARCHIVO: client/src/features/orders/hooks/useOrderState.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState, useCallback } from 'react';
import { Order, OrderState, CreateOrderRequest } from '../models/order.model';
import { OrderService } from '../services/order.service';

export interface UseOrderStateReturn {
  orders: Order[];
  createOrder: (order: CreateOrderRequest) => Promise<void>;
  updateOrderState: (id: string, state: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useOrderState(orderService: OrderService): UseOrderStateReturn {
  throw new Error('TODO(reto): useOrderState');
}

export class OrderE2ETest {
  private orderService: OrderService;
  private repository: any;

  constructor(orderService: OrderService, repository: any) {
    this.orderService = orderService;
    this.repository = repository;
  }

  async testCreateOrder(): Promise<void> {
    throw new Error('TODO(reto): testCreateOrder');
  }

  async testUpdateOrderState(): Promise<void> {
    throw new Error('TODO(reto): testUpdateOrderState');
  }

  async testCreateInvalidOrder(): Promise<void> {
    throw new Error('TODO(reto): testCreateInvalidOrder');
  }

  async testUpdateToInvalidState(): Promise<void> {
    throw new Error('TODO(reto): testUpdateToInvalidState');
  }
}

// === ARCHIVO: client/src/features/orders/components/OrderList.tsx ===
import React from 'react';
import { useOrderState } from '../hooks/useOrderState';
import { OrderService } from '../services/order.service';
import type { Order, OrderState } from '../models/order.model';

interface OrderListProps {
    orders: Order[];
    onUpdateState: (id: string, state: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    isLoading: boolean;
}

const orderService = new OrderService();

export function OrderList({ orders, onUpdateState, onDelete, isLoading }: OrderListProps) {
  const { updateOrderState, error: hookError } = useOrderState(orderService);

  const handleStateChange = async (id: string, newState: OrderState) => {
    await onUpdateState(id, newState);
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  const getStateColor = (state: OrderState): string => {
    const colors: Record<OrderState, string> = {
      pending: '#f59e0b',
      completed: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[state] || '#6b7280';
  };

  if (isLoading) {
    return (
      <div role="status" aria-label="Cargando órdenes">
        <p>Cargando órdenes...</p>
      </div>
    );
  }

  if (hookError) {
    return (
      <div role="alert" aria-label="Error al cargar órdenes">
        <p>Error: {hookError}</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h2>Órdenes</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles</p>
      ) : (
        <ul>
          {orders.map((order: Order) => (
            <li key={order.id} className="order-item">
              <div className="order-header">
                <span className="order-id">ID: {order.id}</span>
                <span 
                  className="order-state"
                  style={{ backgroundColor: getStateColor(order.state) }}
                >
                  {order.state}
                </span>
              </div>
              <div className="order-details">
                <p>Items: {order.items.length}</p>
                <p>Creado: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Actualizado: {new Date(order.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="order-actions">
                {order.state === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStateChange(order.id, 'completed')}
                      aria-label={`Marcar orden ${order.id} como completada`}
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => handleStateChange(order.id, 'cancelled')}
                      aria-label={`Cancelar orden ${order.id}`}
                    >
                      Cancelar
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(order.id)}
                  aria-label={`Eliminar orden ${order.id}`}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/tests/order.e2e.test.tsx ===
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderForm } from '../components/OrderForm';
import { OrderList } from '../components/OrderList';
import { DynamoOrderRepository } from '../repositories/dynamo-order.repository';
import type { Order, OrderState, CreateOrderRequest } from '../models/order.model';

describe('Order E2E - Flujo completo de órdenes', () => {
  let mockDocumentClient: any;
  let repository: DynamoOrderRepository;
  let mockOrders: Order[];

  beforeEach(() => {
    mockOrders = [
      {
        id: 'order-1',
        items: [{ productId: 'prod-1', quantity: 2 }],
        state: 'pending',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: 'order-2',
        items: [{ productId: 'prod-2', quantity: 1 }],
        state: 'completed',
        createdAt: '2024-01-14T10:00:00Z',
        updatedAt: '2024-01-14T12:00:00Z',
      },
    ];

    mockDocumentClient = {
      put: vi.fn().mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue({}),
      })),
      get: vi.fn().mockImplementation((params: any) => {
        const order = mockOrders.find((o) => o.id === params.Key.id);
        return {
          promise: vi.fn().mockResolvedValue({ Item: order }),
        };
      }),
      update: vi.fn().mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue({}),
      })),
      delete: vi.fn().mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue({}),
      })),
      scan: vi.fn().mockImplementation(() => ({
        promise: vi.fn().mockResolvedValue({ Items: mockOrders }),
      })),
    };

    repository = new DynamoOrderRepository(mockDocumentClient, 'OrdersTable');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Creación de órdenes', () => {
    it('debe crear una orden exitosamente cuando se proporcionan datos válidos', async () => {
      const newOrderRequest: CreateOrderRequest = {
        items: [{ productId: 'prod-new-1', quantity: 3 }],
      };

      let createdOrder: Order | undefined;

      const handleSubmit = async (request: CreateOrderRequest): Promise<Order> => {
        createdOrder = await repository.createOrder(request);
        return createdOrder as Order;
      };

      render(<OrderForm onSubmit={handleSubmit} />);

      const submitButton = screen.getByRole('button', { name: /crear orden/i });
      expect(submitButton).toBeInTheDocument();

      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockDocumentClient.put).toHaveBeenCalledTimes(1);
      });

      expect(createdOrder).toBeDefined();
      expect(createdOrder?.items).toEqual(newOrderRequest.items);
      expect(createdOrder?.state).toBe('pending');
    });

    it('debe rechazar la creación de una orden sin items', async () => {
      const invalidRequest: CreateOrderRequest = {
        items: [],
      };

      const handleSubmit = async (request: CreateOrderRequest): Promise<Order> => {
        if (request.items.length === 0) {
          throw new Error('La orden debe tener al menos un producto');
        }
        return repository.createOrder(request);
      };

      render(<OrderForm onSubmit={handleSubmit} initialData={invalidRequest} />);

      const submitButton = screen.getByRole('button', { name: /crear orden/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/al menos un producto/i)).toBeInTheDocument();
      });
    });
  });

  describe('Actualización de estado de órdenes', () => {
    it('debe actualizar el estado de pending a completed', async () => {
      const newState: OrderState = 'completed';

      let updatedOrder: Order | undefined;

      const handleUpdateState = async (id: string, state: string): Promise<void> => {
        updatedOrder = await repository.updateOrderState(id, state as OrderState);
      };

      const orders: Order[] = [...mockOrders];

      render(
        <OrderList
          orders={orders}
          onUpdateState={handleUpdateState}
          onDelete={async () => {}}
          isLoading={false}
        />
      );

      const completeButton = screen.getByRole('button', { name: /completar/i });
      await userEvent.click(completeButton);

      await waitFor(() => {
        expect(mockDocumentClient.update).toHaveBeenCalledTimes(1);
      });

      expect(updatedOrder?.state).toBe('completed');
    });

    it('debe actualizar el estado de pending a cancelled', async () => {
      const newState: OrderState = 'cancelled';

      let updatedOrder: Order | undefined;

      const handleUpdateState = async (id: string, state: string): Promise<void> => {
        updatedOrder = await repository.updateOrderState(id, state as OrderState);
      };

      const orders: Order[] = [...mockOrders];

      render(
        <OrderList
          orders={orders}
          onUpdateState={handleUpdateState}
          onDelete={async () => {}}
          isLoading={false}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await userEvent.click(cancelButton);

      await waitFor(() => {
        expect(mockDocumentClient.update).toHaveBeenCalledTimes(1);
      });

      expect(updatedOrder?.state).toBe('cancelled');
    });

    it('debe rechazar estados inválidos', async () => {
      const handleUpdateState = async (id: string, state: string): Promise<void> => {
        const validStates: OrderState[] = ['pending', 'completed', 'cancelled'];
        if (!validStates.includes(state as OrderState)) {
          throw new Error('Estado inválido');
        }
        await repository.updateOrderState(id, state as OrderState);
      };

      const orders: Order[] = [...mockOrders];

      render(
        <OrderList
          orders={orders}
          onUpdateState={handleUpdateState}
          onDelete={async () => {}}
          isLoading={false}
        />
      );

      const invalidState = 'invalid-state';

      await waitFor(() => {
        expect(() => {
          repository.updateOrderState('order-1', invalidState as OrderState);
        }).rejects.toThrow('Estado inválido');
      });
    });
  });

  describe('Listado de órdenes', () => {
    it('debe mostrar todas las órdenes persistidas', async () => {
      let loadedOrders: Order[] = [];

      const handleLoad = async (): Promise<Order[]> => {
        const result = await mockDocumentClient.scan({ TableName: 'OrdersTable' }).promise();
        loadedOrders = result.Items;
        return loadedOrders;
      };

      const orders = await handleLoad();

      render(<OrderList orders={orders} onUpdateState={async () => {}} onDelete={async () => {}} isLoading={false} />);

      expect(screen.getByText('Órdenes')).toBeInTheDocument();
      expect(screen.getByText('order-1')).toBeInTheDocument();
      expect(screen.getByText('order-2')).toBeInTheDocument();
    });

    it('debe mostrar el estado correcto de cada orden', async () => {
      const orders: Order[] = [
        {
          id: 'order-test-1',
          items: [{ productId: 'prod-1', quantity: 1 }],
          state: 'pending',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: 'order-test-2',
          items: [{ productId: 'prod-2', quantity: 2 }],
          state: 'completed',
          createdAt: '2024-01-15T11:00:00Z',
          updatedAt: '2024-01-15T12:00:00Z',
        },
        {
          id: 'order-test-3',
          items: [{ productId: 'prod-3', quantity: 3 }],
          state: 'cancelled',
          createdAt: '2024-01-15T13:00:00Z',
          updatedAt: '2024-01-15T14:00:00Z',
        },
      ];

      render(<OrderList orders={orders} onUpdateState={async () => {}} onDelete={async () => {}} isLoading={false} />);

      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('completed')).toBeInTheDocument();
      expect(screen.getByText('cancelled')).toBeInTheDocument();
    });
  });

  describe('Eliminación de órdenes', () => {
    it('debe eliminar una orden exitosamente', async () => {
      const orderId = 'order-1';
      let deleteResult: boolean = false;

      const handleDelete = async (id: string): Promise<void> => {
        await repository.deleteOrder(id);
        deleteResult = true;
      };

      const orders: Order[] = [...mockOrders];

      render(
        <OrderList
          orders={orders}
          onUpdateState={async () => {}}
          onDelete={handleDelete}
          isLoading={false}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /eliminar/i });
      await userEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockDocumentClient.delete).toHaveBeenCalledTimes(1);
      });

      expect(deleteResult).toBe(true);
    });
  });

  describe('Persistencia en DynamoDB', () => {
    it('debe persistir la orden en DynamoDB con el formato correcto', async () => {
      const orderRequest: CreateOrderRequest = {
        items: [{ productId: 'prod-persist-1', quantity: 5 }],
      };

      const createdOrder = await repository.createOrder(orderRequest);

      expect(mockDocumentClient.put).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'OrdersTable',
          Item: expect.objectContaining({
            id: expect.any(String),
            items: orderRequest.items,
            state: 'pending',
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        })
      );

      expect(createdOrder.id).toBeDefined();
      expect(createdOrder.items).toEqual(orderRequest.items);
    });

    it('debe recuperar una orden por su id desde DynamoDB', async () => {
      const orderId = 'order-1';
      const retrievedOrder = await repository.getOrder(orderId);

      expect(mockDocumentClient.get).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'OrdersTable',
          Key: { id: orderId },
        })
      );

      expect(retrievedOrder).toEqual(mockOrders[0]);
    });
  });
});

// === ARCHIVO: client/src/index.scss ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/app/App.tsx ===
import React from 'react';
import { OrderForm } from '../features/orders/components/OrderForm';
import { OrderList } from '../features/orders/components/OrderList';
import { OrderService } from '../features/orders/services/order.service';
import { CreateOrderRequest, Order } from '../features/orders/models';

const orderService = new OrderService();

export default function App() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCreateOrder = async (request: CreateOrderRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error('Error al crear la orden');
      const newOrder: Order = await response.json();
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderState = async (id: string, state: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}/state`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });
      if (!response.ok) throw new Error('Error al actualizar el estado');
      const updatedOrder: Order = await response.json();
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar el estado';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la orden');
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Órdenes</h1>
      </header>
      
      <main className="app-main">
        <section className="orders-form-section">
          <h2>Crear Nueva Orden</h2>
          <OrderForm onSubmit={handleCreateOrder} />
        </section>

        <section className="orders-list-section">
          <h2>Órdenes Existentes</h2>
          {error && <div className="error-message">{error}</div>}
          <OrderList
            orders={orders}
            onUpdateState={handleUpdateOrderState}
            onDelete={handleDeleteOrder}
            isLoading={loading}
          />
        </section>
      </main>
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/models.ts ===
export type { Order, OrderItem, OrderState } from './models/order.model';
export type { CreateOrderRequest } from './models/create-order-request.model';

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
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

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
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

// === ARCHIVO: infra/modules/dynamodb/orders.tf ===
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

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
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

// === ARCHIVO: infra/environments/dev/main.tf ===
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

// === ARCHIVO: infra/environments/dev/orders_versioning.tf ===
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

// === ARCHIVO: infra/README.md ===
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

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Configuración principal del módulo DynamoDB
# Este archivo define el recurso de tabla DynamoDB con todas sus configuraciones

resource "aws_dynamodb_table" "this" {
  name           = var.table_name
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

  dynamic "ttl" {
    for_each = var.ttl_attribute != null ? [var.ttl_attribute] : []
    content {
      attribute_name = ttl.value
      enabled        = true
    }
  }

  stream_enabled = var.stream_enabled
  stream_view_type = var.stream_view_type

  tags = var.tags

  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }
}

resource "aws_dynamodb_table" "orders" {
  name           = "orders-${var.environment}"
  billing_mode   = var.billing_mode
  hash_key       = "orderId"
  range_key      = "customerId"

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "customerId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  attribute {
    name = "updatedAt"
    type = "S"
  }

  global_secondary_index {
    name               = "customer-status-index"
    hash_key           = "customerId"
    range_key          = "status"
    projection_type    = "ALL"
    read_capacity      = var.read_capacity
    write_capacity     = var.write_capacity
    non_key_attributes = ["orderId", "createdAt", "totalAmount"]
  }

  global_secondary_index {
    name               = "status-created-index"
    hash_key           = "status"
    range_key          = "createdAt"
    projection_type    = "ALL"
    read_capacity      = var.read_capacity
    write_capacity     = var.write_capacity
    non_key_attributes = ["orderId", "customerId", "totalAmount"]
  }

  ttl {
    attribute_name = "expirationTime"
    enabled        = true
  }

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  tags = merge(var.tags, {
    Name        = "orders-${var.environment}"
    Environment = var.environment
    ManagedBy   = "terraform"
    Project     = "order-management"
  })

  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }
}

resource "aws_dynamodb_resource_policy" "orders" {
  resource_arn = aws_dynamodb_table.orders.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "*"
        }
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.orders.arn
        Condition = {
          "IpAddress" = {
            "aws:SourceIp" = ["10.0.0.0/8", "172.16.0.0/12"]
          }
        }
      }
    ]
  })
}

resource "aws_sns_topic" "orders_stream" {
  name = "orders-stream-${var.environment}"
}

resource "aws_sns_topic_subscription" "orders_target" {
  topic_arn = aws_sns_topic.orders_stream.arn
  protocol  = "lambda"
  endpoint  = var.lambda_function_arn
}

resource "aws_lambda_permission" "sns_orders" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.orders_stream.arn
}

// === ARCHIVO: infra/environments/dev/variables.tf ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.

Tablas de DynamoDB: `OrdersTable` (pk `id`).


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "OrdersTable" "id"

```
