import { Order, OrderState } from '../models';

export interface OrderRepository {
    getOrder(id: string): Promise<Order>;
    deleteOrder(id: string): Promise<void>;
}

export class DynamoOrderRepository implements OrderRepository {
    private readonly tableName: string;
    private readonly documentClient: any;

    constructor(documentClient: any, tableName: string = 'Orders') {
        if (!documentClient) {
            throw new Error('DocumentClient is required');
        }
        this.documentClient = documentClient;
        this.tableName = tableName;
    }

    async getOrder(id: string): Promise<Order> {
        try {
            const result = await this.documentClient.get({
                TableName: this.tableName,
                Key: { id },
            }).promise();

            if (!result.Item) {
                throw new Error('Order not found');
            }

            return result.Item as Order;
        } catch (error) {
            console.error('Error fetching order from DynamoDB:', error);
            throw new Error('Failed to fetch order from DynamoDB');
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await this.documentClient.delete({
                TableName: this.tableName,
                Key: { id },
            }).promise();
        } catch (error) {
            console.error('Error deleting order from DynamoDB:', error);
            throw new Error('Failed to delete order from DynamoDB');
        }
    }
}