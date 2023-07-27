import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from 'src/app/models/Cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent {
  endSubs$: Subject<any> = new Subject();
  featureProducts: Product[] = [];
  constructor(private productService: ProductService,private router:Router,private cartService:CartService) {}

  ngOnInit() {
    this.getFeatureProduct();
  }

  addToCart(id:string) {
    // this.products.map((product) => {
    //   this.product = product
    // });
    const cartItem: CartItem = {
      productId: id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
  }

  getFeatureProduct() {
    this.productService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.featureProducts = products;
      });
  }
  navigateToProductPage(id?:string){
    this.router.navigate([`/product/${id}`])
  }
}
