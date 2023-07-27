import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/Cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  productData: Product = new Product();
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.singleProduct(params['id']);
    });
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.productData.id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartItem)
  }

  singleProduct(id: string) {
    this.productService.singleProduct(id).subscribe((product) => {
      this.productData = product;
    });
  }
}
