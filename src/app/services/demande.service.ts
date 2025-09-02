// src/app/services/demande.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Demande } from '../views/demandelist/demande.model';
import { CreateDemandeResponse } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiBase = 'http://localhost:4000/api';
  private http: AxiosInstance;

  constructor() {
    // Make sure NO leftover global Authorization header interferes
    try { delete (axios.defaults.headers as any)?.common?.Authorization; } catch {}

    this.http = axios.create({
      baseURL: this.apiBase,
      withCredentials: true // ⬅️ send the jwt cookie
    });
  }

  // --- CREATE
  createDemande(demande: Demande): Promise<CreateDemandeResponse> {
    return this.http.post<CreateDemandeResponse>(`/demandes`, demande, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.data)
    .catch(err => { console.error('Error creating demande', err); throw err; });
  }

  // --- READ ONE
  getDemandeById(id: number): Promise<Demande> {
    return this.http.get<Demande>(`/demandes/${id}`)
      .then(res => res.data)
      .catch(err => { console.error('Error fetching demande by id', err); throw err; });
  }

  // --- READ ALL
  getAllDemandes(): Promise<Demande[]> {
    return this.http.get<Demande[]>(`/demandes`)
      .then(res => res.data)
      .catch(err => { console.error('Error fetching all demandes', err); throw err; });
  }

  // --- UPDATE
  updateDemande(id: number, demande: Demande): Promise<Demande> {
    return this.http.put<Demande>(`/demandes/${id}`, demande, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.data)
    .catch(err => { console.error('Error updating demande', err); throw err; });
  }

  updateState(id: number, etat: string): Promise<any> {
    return this.http.put<any>(`/demandes/etat/${id}`, { etat }, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.data)
    .catch(err => { console.error('Error updating state of demande', err); throw err; });
  }

  // --- DELETE
  deleteDemande(id: number): Promise<void> {
    return this.http.delete<void>(`/demandes/${id}`)
      .then(res => res.data)
      .catch(err => { console.error('Error deleting demande', err); throw err; });
  }

  // --- CLIENT LINKS
  addClientToDemande(demandeId: number, clientId: number): Promise<any> {
    return this.http.post<any>(`/demandes/${demandeId}/clients/${clientId}`)
      .then(res => res.data)
      .catch(err => { console.error('Error adding client to demande', err); throw err; });
  }

  removeClientFromDemande(demandeId: number, clientId: number): Promise<any> {
    return this.http.delete<any>(`/demandes/${demandeId}/clients/${clientId}`)
      .then(res => res.data)
      .catch(err => { console.error('Error removing client from demande', err); throw err; });
  }

  getDemandesByClientId(clientId: number): Promise<Demande[]> {
    return this.http.get<Demande[]>(`/demandes/client/${clientId}`)
      .then(res => res.data)
      .catch(err => { console.error('Error fetching demandes by client id', err); throw err; });
  }
}
