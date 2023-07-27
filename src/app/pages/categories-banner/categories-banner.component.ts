import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss'],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();
  constructor(
    private categoryService: CategoryServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }
  ngOnDestroy() {
    this.endSubs$.next(void 0);
    this.endSubs$.complete();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  getCategoryId(id?: string) {
    this.router.navigate([`/category/${id}`]);
  }
}
