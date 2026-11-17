import { Module } from '@nestjs/common';
import { OrderService } from './application/services/order.service';
import { OrderController } from './infrastructure/controllers/order.controller';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { DynamoDBProvider } from './infrastructure/providers/dynamodb.provider';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    DynamoOrderRepository,
    DynamoDBProvider,
  ],
})
export class AppModule {}