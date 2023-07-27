import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.url+'/products/get/featured/' + `${count}`
    );
  }

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.url+'/products', {
      params: params,
    });
  }

  singleProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.url+'/products/' + `${id}`);
  }
}
