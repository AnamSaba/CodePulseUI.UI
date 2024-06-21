import { Component, OnDestroy } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnDestroy{

  model: AddBlogPost
  addBlogPostSubscription?: Subscription

  constructor(private blogPostService: BlogPostService,
    private router: Router
  ){
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }

  onFormSubmit(): void{
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
