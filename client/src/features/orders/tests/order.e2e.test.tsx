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