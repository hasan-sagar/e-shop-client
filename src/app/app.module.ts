import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NavComponent } from './shared/nav/nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { UiBannerComponent } from './pages/ui-banner/ui-banner.component';
import { CategoriesBannerComponent } from './pages/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { CartService } from './services/cart.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import {MatTableModule} from '@angular/material/table';
import { ThankyouPageComponent } from './pages/thankyou-page/thankyou-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    NavComponent,
    HeaderComponent,
    UiBannerComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductPageComponent,
    CartPageComponent,
    CheckoutPageComponent,
    OrderListComponent,
    ThankyouPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    RatingModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(cartService: CartService) {
    cartService.initialCart();
  }
}
