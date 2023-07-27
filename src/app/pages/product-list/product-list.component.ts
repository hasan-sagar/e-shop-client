import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/Cart';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  categories: Category[] = [];
  products: Product[] = [];
  secondary: any;
  isCategoryPage: boolean | undefined;
  product: Product;

  constructor(
    private categoryService: CategoryServiceService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      params['id'] ? this.getProducts([params['id']]) : this.getProducts();
      params['id']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this.getCategories();
    // this.getProducts();
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

  getProducts(categoriesFilter?: string[]) {
    this.productService.getProducts(categoriesFilter).subscribe((products) => {
      this.products = products;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  categoryFilter() {
    const selectedCategories: any = this.categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.id);
    console.log(selectedCategories);
    this.getProducts(selectedCategories);
  }

  navigateToProductPage(id?: string) {
    this.router.navigate([`/product/${id}`]);
  }
}
