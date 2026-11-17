import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';

export interface OrderRepository {
  createOrder(createOrderRequest: CreateOrderRequest): Promise<Order>;
  updateOrderState(id: string, state: 'pending' | 'completed' | 'cancelled'): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  deleteOrder(id: string): Promise<void>;
}