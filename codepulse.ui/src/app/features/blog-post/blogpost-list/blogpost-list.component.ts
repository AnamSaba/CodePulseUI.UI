import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit{

  blogPosts$?: Observable<BlogPost[]>
  constructor(private blogPostService: BlogPostService) {

  }

  ngOnInit(): void {

    // get all blog posts from api

    this.blogPosts$ =  this.blogPostService.getAllBlogPost();
  }
}