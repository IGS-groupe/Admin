// src/app/services/news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsItem } from '../models/news';



@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:4000/api/news';
  private apiUrl2 = 'http://localhost:4000/api/auth/news';
   private getAuthHeaders() {
    const token = localStorage.getItem('Admintoken'); // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
  private getFormDataHeaders() {
    const token = localStorage.getItem('Admintoken');
    return {
        'Authorization': `Bearer ${token}`
    };
}
  constructor(private http: HttpClient) {}

  getAll(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.apiUrl2);
  }

  getBySlug(slug: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${slug}`);
  }

  create(news: FormData): Observable<NewsItem> {
      console.log('Creating news with data:', localStorage.getItem('Admintoken'));
      return this.http.post<NewsItem>(this.apiUrl, news, {
          headers: this.getFormDataHeaders()
      });
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{
      headers: this.getAuthHeaders()
    });
  }
  getNewsBySlug(slug: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${slug}`,{
      headers: this.getAuthHeaders()
    });
  }
  
  updateNews(slug: string, data: Partial<NewsItem>): Observable<NewsItem> {
    return this.http.put<NewsItem>(`${this.apiUrl}/${slug}`, data,{
      headers: this.getAuthHeaders()
    });
  }
  
}
