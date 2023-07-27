import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../models/Cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  // newCart: any;

  constructor(private http: HttpClient) {}

  initialCart() {
    const cartItems = this.getCart();
    if (!cartItems) {
      const initialCart = {
        items: [],
      };
      const cart = JSON.stringify(initialCart);
      localStorage.setItem('cart', cart);
    }
  }

  getCart(): Cart {
    const cartJson: string = localStorage.getItem('cart');
    const cart: Cart = JSON.parse(cartJson);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartExistItem = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (cartExistItem) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
      });
    } else {
      cart.items.push(cartItem);
    }
    const cartStorage = JSON.stringify(cart);
    localStorage.setItem('cart', cartStorage);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId !== productId);
    cart.items = newCart;
    const cartStorage = JSON.stringify(cart);
    localStorage.setItem('cart', cartStorage);
    this.cart$.next(cart);
  }
}
