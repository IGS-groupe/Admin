// src/app/services/news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsItem } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl  = 'http://localhost:4000/api/news';
  private apiUrl2 = 'http://localhost:4000/api/auth/news'; // if this is your public list endpoint

  constructor(private http: HttpClient) {}

  private credOnly = { withCredentials: true as const };
  private jsonOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true as const
  };

  // --- Public or auth list (keep whichever you actually use)
  getAll(): Observable<NewsItem[]> {
    // If this endpoint is public you can drop withCredentials, but it's safe to keep.
    return this.http.get<NewsItem[]>(this.apiUrl2, this.credOnly);
  }

  // --- Get by id
  getById(id: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${id}`, this.credOnly);
  }

  // --- Get by slug
  getNewsBySlug(slug: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.apiUrl}/${slug}`, this.credOnly);
  }

  // --- Create (FormData)
  create(news: FormData): Observable<NewsItem> {
    // Do NOT set Content-Type for FormData; browser will set correct boundary
    return this.http.post<NewsItem>(this.apiUrl, news, this.credOnly);
  }

  // --- Update (FormData)
  updateNews(id: number, news: NewsItem, imageFile?: File): Observable<NewsItem> {
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('slug', news.slug);
    formData.append('date', news.date);      // yyyy-MM-dd
    formData.append('content', news.content);
    if (imageFile) formData.append('image', imageFile);

    return this.http.put<NewsItem>(`${this.apiUrl}/${id}`, formData, this.credOnly);
  }

  // --- Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.credOnly);
  }
}
