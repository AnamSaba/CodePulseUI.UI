import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy, OnInit{

  model: AddBlogPost
  addBlogPostSubscription?: Subscription
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectorSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router, private categoryService: CategoryService,
      private imageService: ImageService){
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
    this.imageSelectorSubscription =  this.imageService.onSelectImage()
        .subscribe({
            next: (selectedImage) => {
              this.model.featuredImageUrl = selectedImage.url;
              this.closeImageSelector();
            }
        })
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

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();
  }

}
