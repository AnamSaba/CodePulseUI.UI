import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit{

  model: AddBlogPost
  addBlogPostSubscription?: Subscription
  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService,
    private router: Router, private categoryService: CategoryService
  ){
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categoriesCollection: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategory();
  }

  onFormSubmit(): void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }

}
