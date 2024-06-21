import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { UpdateCategoryResquest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription? : Subscription
  category?: Category
  editCategorySubscription?: Subscription


  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id)
          {
            // Get the data from API for this category id

              this.categoryService.getCategoryById(this.id)
              .subscribe({
                next: (response) =>
                  {
                    this.category = response;
                  }
              })

          }
      }
    })
  }

  onFormSubmit(){

    const updateCategoryRequest: UpdateCategoryResquest = {
      name : this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    // pass this object to service

    if(this.id){
     this.editCategorySubscription =  this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

}
