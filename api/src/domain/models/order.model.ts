import { IsArray, IsDateString, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItem {
  @IsString()
  productId: string;

  @IsString()
  quantity: number;

  constructor(productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

export class Order {
  @IsString()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @IsEnum(['pending', 'completed', 'cancelled'])
  state: 'pending' | 'completed' | 'cancelled';

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  constructor(
    id: string,
    items: OrderItem[],
    state: 'pending' | 'completed' | 'cancelled',
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.items = items;
    this.state = state;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}