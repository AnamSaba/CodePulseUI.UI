import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/model/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit, OnDestroy {

  url: string | null = null;
  routeSubscription?: Subscription;
  blogPost$?: Observable<BlogPost>;

  constructor(private route: ActivatedRoute,  
    private blogPostservice: BlogPostService) {

  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
        next: (param) => {
          this.url = param.get('url');
        }
    })

    // Fetch blog details by url
    if(this.url)
      {
        this.blogPost$ = this.blogPostservice.getBlogPostByUrlHandle(this.url);
      }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
