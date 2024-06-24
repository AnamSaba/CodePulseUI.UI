import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../model/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../model/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {


  id: string | null = null;
  model?: BlogPost
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>
  selectedCategories?: string[];
  deleteBlogPostSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categorySrvice: CategoryService,
    private router: Router) {
  }

  ngOnInit(): void {

    
    this.categories$ = this.categorySrvice.getAllCategory();

    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get blogPost from API.

        if(this.id)
          {
            this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id)
            .subscribe({
              next: (response) =>
                {
                  this.model = response;
                  this.selectedCategories = response.categories.map(x => x.id);
                }
            })
          }
      }
    })
  }

  onFormSubmit(): void{

    // Covert this model to request object

    if(this.model && this.id)
      {
        var updateBlogPost: UpdateBlogPost = {
          author: this.model.author,
          title: this.model.title,
          urlHandle: this.model.urlHandle,
          publishedDate: this.model.publishedDate,
          featuredImageUrl: this.model.featuredImageUrl,
          content: this.model.content,
          isVisible: this.model.isVisible,
          shortDescription: this.model.shortDescription,
          categoriesCollection: this.selectedCategories ?? []
        }

        
          this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
          .subscribe({
            next: (response) => {
              this.router.navigateByUrl('/admin/blogposts');
            }
          })
      }

  }

  onDelete() : void {
    if(this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (respnse) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
      }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}
