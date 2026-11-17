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