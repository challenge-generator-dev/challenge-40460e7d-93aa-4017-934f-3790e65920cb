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