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
    const token = localStorage.getItem('Admintoken');
    return this.http.get<NewsItem>(`${this.apiUrl}/slug/${slug}`,{
      headers: {'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNzaW5lIiwiaWF0IjoxNzUwMjYyNDkzLCJleHAiOjE3NTAyNzY4OTN9.zMlkfcSJ4p5eNt4mHFy8lt-YHa22DnFUCaC3dWmAEnQ`}
    });
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
  
  updateNews(id: number, news: NewsItem, imageFile?: File): Observable<NewsItem> {
  const formData = new FormData();
    formData.append('title', news.title);
    formData.append('slug', news.slug);
    formData.append('date', news.date); // format: yyyy-MM-dd
    formData.append('content', news.content);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<NewsItem>(`${this.apiUrl}/${id}`, formData, {
      headers: this.getFormDataHeaders()// Ne pas définir Content-Type, Angular le fera
    });
  }

  
}
