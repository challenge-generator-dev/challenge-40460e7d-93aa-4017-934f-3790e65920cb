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