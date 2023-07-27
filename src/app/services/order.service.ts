import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(
      this.url+'/products/'+`${productId}`
    );
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url + '/orders/create', order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url+'/orders');
  }
}
