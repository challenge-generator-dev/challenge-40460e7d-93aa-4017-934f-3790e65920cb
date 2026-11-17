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