export type OrderState = 'pending' | 'completed' | 'cancelled';

export interface OrderItem {
    productId: string;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    state: OrderState;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderRequest {
    items: Array<{ productId: string; quantity: number }>;
}