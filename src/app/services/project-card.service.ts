// src/app/services/project-card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Mirrors your backend entity (no DTOs) */
export interface ProjectCard {
  id?: number;
  title: string;
  category?: string | null;
  sortIndex?: number | null;
  bullets: string[];     // persisted as @ElementCollection in JPA
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectCardService {
  // Adjust host/port as needed or swap to environment.apiUrl
  private baseUrl = 'http://localhost:4000/api/project-cards';

  constructor(private http: HttpClient) {}

  /** GET /api/project-cards */
  list(): Observable<ProjectCard[]> {
    return this.http.get<ProjectCard[]>(`${this.baseUrl}`, { withCredentials: true });
  }

  /** GET /api/project-cards/{id} */
  get(id: number): Observable<ProjectCard> {
    return this.http.get<ProjectCard>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  /** POST /api/project-cards  (ADMIN/SUPER_ADMIN) */
  create(card: ProjectCard): Observable<ProjectCard> {
    return this.http.post<ProjectCard>(`${this.baseUrl}`, card, { withCredentials: true });
  }

  /** PUT /api/project-cards/{id}  (ADMIN/SUPER_ADMIN) */
  update(id: number, card: ProjectCard): Observable<ProjectCard> {
    return this.http.put<ProjectCard>(`${this.baseUrl}/${id}`, card, { withCredentials: true });
  }

  /** PATCH /api/project-cards/{id}/active?active=true|false  (ADMIN/SUPER_ADMIN) */
  setActive(id: number, active: boolean): Observable<ProjectCard> {
    const params = new HttpParams().set('active', String(active));
    return this.http.patch<ProjectCard>(`${this.baseUrl}/${id}/active`, null, {
      params,
      withCredentials: true
    });
  }

  /**
   * POST /api/project-cards/reorder
   * Body: [id1, id2, id3, ...] in the desired order (ADMIN/SUPER_ADMIN)
   * Returns the fresh ordered list.
   */
  reorder(orderedIds: number[]): Observable<ProjectCard[]> {
    return this.http.post<ProjectCard[]>(`${this.baseUrl}/reorder`, orderedIds, { withCredentials: true });
  }

  /** DELETE /api/project-cards/{id}  (ADMIN/SUPER_ADMIN) */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
