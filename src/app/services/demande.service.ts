// src/app/services/demande.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Demande } from '../views/demandelist/demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:4000/api/demandes'; // Adjust this to your actual API endpoint

  constructor() { }

  private getAuthHeaders() {
    const token = localStorage.getItem('Admintoken'); // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  createDemande(demande: Demande): Promise<Demande> {
    return axios.post<Demande>(this.apiUrl, demande, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error creating demande', error);
        throw error;
      });
  }

  getDemandeById(id: number): Promise<Demande> {
    return axios.get<Demande>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching demande by id', error);
        throw error;
      });
  }

  getAllDemandes(): Promise<Demande[]> {
    return axios.get<Demande[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching all demandes', error);
        throw error;
      });
  }

  updateDemande(id: number, demande: Demande): Promise<Demande> {
    return axios.put<Demande>(`${this.apiUrl}/${id}`, demande, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error updating demande', error);
        throw error;
      });
  }
  updateState(id: number, etat: string): Promise<any> {
    return axios.put<any>(`${this.apiUrl}/etat/${id}`, { etat }, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error updating state of demande', error);
        throw error;
      });
  }

  deleteDemande(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error deleting demande', error);
        throw error;
      });
  }
  
  // New methods for managing multiple clients
  addClientToDemande(demandeId: number, clientId: number): Promise<any> {
    return axios.post<any>(`${this.apiUrl}/${demandeId}/clients/${clientId}`, {}, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error adding client to demande', error);
        throw error;
      });
  }
  
  removeClientFromDemande(demandeId: number, clientId: number): Promise<any> {
    return axios.delete<any>(`${this.apiUrl}/${demandeId}/clients/${clientId}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error removing client from demande', error);
        throw error;
      });
  }
  
  getDemandesByClientId(clientId: number): Promise<Demande[]> {
    return axios.get<Demande[]>(`${this.apiUrl}/client/${clientId}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching demandes by client id', error);
        throw error;
      });
  }
}
