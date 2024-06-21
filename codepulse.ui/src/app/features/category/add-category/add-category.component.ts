import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{


  model: AddCategoryRequest;

  private addCategorySubscription? : Subscription;

  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }
  onFormSubmit() {
    this.addCategorySubscription =  this.categoryService.addCategory(this.model)
    .subscribe({
      next:(response) => {
        console.log('This was successful!');
      }
    })

  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
