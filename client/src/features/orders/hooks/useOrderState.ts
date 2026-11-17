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