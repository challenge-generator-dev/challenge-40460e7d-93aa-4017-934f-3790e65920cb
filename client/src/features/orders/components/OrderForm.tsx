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