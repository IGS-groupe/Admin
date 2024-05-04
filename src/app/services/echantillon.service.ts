// src/app/services/echantillon.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Echantillon } from '../models/echantillon.model';

@Injectable({
  providedIn: 'root'
})
export class EchantillonService {
  private apiUrl = 'http://localhost:4000/api/echantillons'; // Adjust this to your actual API endpoint

  constructor() { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  saveEchantillon(echantillon: Echantillon): Promise<Echantillon> {
    return axios.post<Echantillon>(this.apiUrl, echantillon, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error saving echantillon', error);
        throw error;
      });
  }

  getAllEchantillons(): Promise<Echantillon[]> {
    return axios.get<Echantillon[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching echantillons', error);
        throw error;
      });
  }

  getEchantillonById(id: number): Promise<Echantillon> {
    return axios.get<Echantillon>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching echantillon by id', error);
        throw error;
      });
  }
  getEchantillonsByDemandeId(demandeId: number): Promise<Echantillon[]> {
    return axios.get<Echantillon[]>(`${this.apiUrl}/by-demande/${demandeId}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching echantillons by demandeId', error);
        throw error;
      });
  }

  deleteEchantillon(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error deleting echantillon', error);
        throw error;
      });
  }

  updateEchantillon(id: number, echantillon: Echantillon): Promise<Echantillon> {
    return axios.put<Echantillon>(`${this.apiUrl}/${id}`, echantillon, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error updating echantillon', error);
        throw error;
      });
  }
}
