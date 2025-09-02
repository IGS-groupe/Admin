// src/app/services/demande.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Demande } from './demande.model';

@Injectable({ providedIn: 'root' })
export class DemandeService {
  private apiBase = 'http://localhost:4000/api';
  private http: AxiosInstance;

  constructor() {
    // Make sure nothing global overrides cookie auth
    try { delete (axios.defaults.headers as any)?.common?.Authorization; } catch {}

    this.http = axios.create({
      baseURL: this.apiBase,
      withCredentials: true, // <-- send/receive JWT cookie
    });
  }

  // --- Create
  createDemande(demande: Demande): Promise<Demande> {
    return this.http.post<Demande>('/demandes', demande, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.data)
    .catch(err => { console.error('Error creating demande', err); throw err; });
  }

  // --- Read all
  getDemandes(): Promise<Demande[]> {
    return this.http.get<Demande[]>('/demandes')
      .then(res => res.data)
      .catch(err => { console.error('Error fetching demandes', err); throw err; });
  }

  // --- Read one
  getDemandeById(id: number): Promise<Demande> {
    return this.http.get<Demande>(`/demandes/${id}`)
      .then(res => res.data)
      .catch(err => { console.error('Error fetching demande', err); throw err; });
  }

  /** Toggle exportExcel flag (server decides the new value) */
  setExportExcel(id: number): Promise<Demande> {
    return this.http.post<Demande>(`/demandes/${id}/export-excel/toggle`, {})
      .then(res => res.data)
      .catch(err => { console.error('Error toggling export-excel', err); throw err; });
  }

  // --- Update
  updateDemande(id: number, demande: Demande): Promise<Demande> {
    return this.http.put<Demande>(`/demandes/${id}`, demande, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.data)
    .catch(err => { console.error('Error updating demande', err); throw err; });
  }

  // --- Delete
  deleteDemande(id: number): Promise<void> {
    return this.http.delete<void>(`/demandes/${id}`)
      .then(res => res.data)
      .catch(err => { console.error('Error deleting demande', err); throw err; });
  }
}
