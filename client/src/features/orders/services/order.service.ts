import axios from 'axios';
import { Order, OrderState } from '../models';

const API_BASE_URL = 'http://localhost:3000';

export class OrderService {
    async getOrder(id: string): Promise<Order> {
        try {
            const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw new Error('Failed to fetch order');
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/orders/${id}`);
        } catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Failed to delete order');
        }
    }
}