import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartItemsDetails } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetails: CartItemsDetails[] = [];
  endSubs$: Subject<any> = new Subject();
  cartCount = 0;
  totalPrice: number;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartDetails();
    this.getOrderSummary();
  }

  ngOnDestroy() {
    this.endSubs$.next(void 0);
    this.endSubs$.complete();
  }

  getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.cartItemsDetails = [];
      this.cartCount = cart?.items.length ?? 0;
      cart.items.forEach((cartItem) => {
        this.productService
          .singleProduct(cartItem.productId)
          .subscribe((products) => {
            this.cartItemsDetails.push({
              product: products,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }

  deleteCarItem(id: string) {
    this.cartService.deleteCartItem(id);
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

  updateCartItemQty(qty, cartItem: CartItemsDetails) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: qty,
      },
      true
    );
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
