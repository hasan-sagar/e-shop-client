import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  orderForm: FormGroup;
  endSubs$: Subject<any> = new Subject();
  totalPrice: number;
  orderItems: OrderItem[] = [];
  userId: '64c28c21cc2f6566d40db8e7';
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form();
    this.getOrderSummary();
    this.getCartItems();
  }

  form() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.orderService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

  getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  createOrder() {
    if (this.orderForm.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.orderForm.value.street,
      shippingAddress2: this.orderForm.value.apartment,
      city: this.orderForm.value.city,
      zip: this.orderForm.value.zip,
      country: this.orderForm.value.country,
      phone: this.orderForm.value.phone,
      // totalPrice: this.orderForm.value.totalPrice,
      user: this.userId,
      dateOrdered: `Date.now()`,
    };
    this.orderService.createOrder(order).subscribe(()=>{
      this.router.navigate(['thankyou-page'])
    });
  }
}
