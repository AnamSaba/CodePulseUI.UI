import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blog-post.model';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../model/update-blog-post.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  createBlogPost(data: AddBlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`,data, {
      headers:{
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  getAllBlogPost(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`, updatedBlogPost, {
      headers:{
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`, {
      headers:{
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

}
