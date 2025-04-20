import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from './demande.model';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:4000/api/demandes';  // Adjust this to your API's base URL

  constructor() { }

  private getAuthHeaders() {
    const token = localStorage.getItem('Admintoken');  // Retrieve the token from localStorage
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

  getDemandes(): Promise<Demande[]> {
    return axios.get<Demande[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching demandes', error);
        throw error;
      });
  }

  getDemandeById(id: number): Promise<Demande> {
    return axios.get<Demande>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching demande', error);
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

  deleteDemande(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error deleting demande', error);
        throw error;
      });
  }
}
