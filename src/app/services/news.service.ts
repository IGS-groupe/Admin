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

  constructor(private http: HttpClient) {}

  getAll(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.apiUrl);
  }

  getBySlug(slug: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${slug}`);
  }

  create(news: FormData): Observable<NewsItem> {
    return this.http.post<NewsItem>(this.apiUrl, news);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getNewsBySlug(slug: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${slug}`);
  }
  
  updateNews(slug: string, data: Partial<NewsItem>): Observable<NewsItem> {
    return this.http.put<NewsItem>(`${this.apiUrl}/${slug}`, data);
  }
  
}
