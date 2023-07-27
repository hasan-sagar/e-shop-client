import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.getOrders();
    console.log(this, this.orders);
  }
  getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
