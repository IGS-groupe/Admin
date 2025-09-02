// src/app/services/echantillon.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Echantillon } from '../models/echantillon.model';
import { Parameter } from '../models/parameter.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EchantillonService {
  private apiBase = 'http://localhost:4000/api';
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: this.apiBase,
      withCredentials: true
    });
  }

  // --- Create (bulk for a demande)
  createEchantillon(demandeId: number, echantillons: Echantillon[]): Observable<any> {
    return from(
      this.http.post<any>(`/echantillons/All/${demandeId}`, echantillons, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }

  // --- Create single
  saveEchantillon(echantillon: Echantillon): Observable<Echantillon> {
    return from(
      this.http.post<Echantillon>(`/echantillons`, echantillon, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }

  // --- Read all
  getAllEchantillons(): Observable<Echantillon[]> {
    return from(
      this.http.get<Echantillon[]>(`/echantillons`)
        .then(res => res.data)
    );
  }

  // --- Read one
  getEchantillonById(id: number): Observable<Echantillon> {
    return from(
      this.http.get<Echantillon>(`/echantillons/${id}`)
        .then(res => res.data)
    );
  }

  // --- By demande
  getEchantillonsByDemandeId(demandeId: number): Observable<Echantillon[]> {
    return from(
      this.http.get<Echantillon[]>(`/echantillons/by-demande/${demandeId}`)
        .then(res => res.data)
    );
  }

  // --- Parameters of an echantillon
  getParametersByEchantillonId(echantillonId: number): Observable<Parameter[]> {
    return from(
      this.http.get<Parameter[]>(`/echantillons/${echantillonId}/parameters`)
        .then(res => res.data)
    );
  }

  // --- Delete
  deleteEchantillon(id: number): Observable<void> {
    return from(
      this.http.delete<void>(`/echantillons/${id}`)
        .then(res => res.data)
    );
  }

  // --- Update
  updateEchantillon(id: number, echantillon: Echantillon): Observable<Echantillon> {
    return from(
      this.http.put<Echantillon>(`/echantillons/${id}`, echantillon, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }
}
