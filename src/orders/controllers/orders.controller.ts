import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { OrderDto } from './dtos/order.dto';

@Controller('/v1/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  placeOrder(@Body() orderDto: OrderDto): Promise<number> {
    return this.ordersService.handleOrder(orderDto);
  }
}
