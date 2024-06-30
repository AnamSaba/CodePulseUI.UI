import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {


  categories$?: Observable<Category[]>
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 2;


  constructor(private categoryService: CategoryService) {
  }


  ngOnInit(): void {

    this.categoryService.getCategoryCount()
      .subscribe({
          next: (value) => {
            this.totalCount = value;

            this.list = new Array(Math.ceil(value/ this.pageSize))

            this.categories$ = this.categoryService.getAllCategory(
              undefined,
              undefined,
              undefined,
              this.pageNumber,
              this.pageSize
            );
          }
      })
  }

  onSearch(query: string): void {
    this.categories$ = this.categoryService.getAllCategory(query);
  }

  sort(sortBy: string, sortDirection: string): void {
    this.categories$ = this.categoryService.getAllCategory(undefined, sortBy, sortDirection, this.pageNumber, this.pageSize);
  }

  getPage(pageNumber: number) : void {

      this.pageNumber = pageNumber;

      this.categories$ = this.categoryService.getAllCategory(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage() : void {
    if(this.pageNumber - 1 < 1) {
        return;
      }

      this.pageNumber -= 1;

      this.categories$ = this.categoryService.getAllCategory(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );

  }

  getNextPage() : void {
    if(this.pageNumber + 1 > this.list.length) {
      return;
    }

      this.pageNumber += 1;

      this.categories$ = this.categoryService.getAllCategory(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );

  }

}