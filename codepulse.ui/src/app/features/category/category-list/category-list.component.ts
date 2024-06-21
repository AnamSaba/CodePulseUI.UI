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

  constructor(private categoryService: CategoryService) {
  }


  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory()
  }

}