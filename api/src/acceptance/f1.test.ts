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