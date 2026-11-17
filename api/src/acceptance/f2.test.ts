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