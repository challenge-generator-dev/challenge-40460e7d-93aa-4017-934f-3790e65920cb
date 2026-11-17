export interface CreateOrderRequest {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
}