import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  cartCount = 0;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart=>{
      this.cartCount = cart?.items.length ?? 0
    })
    // this.cartCount = this.cartService.getCart().items.length;
  }
}
