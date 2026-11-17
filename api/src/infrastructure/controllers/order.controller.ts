// TODO(reto): archivo stubbeado; implementa los cuerpos.
import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from '../../application/services/order.service';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: any, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id/state')
  async updateOrderState(@Param('id') id: string, @Body() body: any, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Put');
  }

  @Get(':id')
  async getOrder(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Get');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Delete');
  }

  private orderToResponse(order: Order): any {
    throw new Error('TODO(reto): orderToResponse');
  }
}