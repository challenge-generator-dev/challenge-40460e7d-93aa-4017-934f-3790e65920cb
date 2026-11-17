import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order.model';

export class CreateOrderRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  constructor(items: OrderItem[]) {
    this.items = items;
  }
}