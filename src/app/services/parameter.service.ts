import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { Parameter } from '../models/parameter.model';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  private apiUrl = 'http://localhost:4000/api/parameters';  // Adjust this to your API's base URL

  constructor() { }


  private getAuthHeaders() {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  saveParameter(parameter: Parameter): Promise<Parameter> {
    return axios.post<Parameter>(this.apiUrl, parameter, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error saving parameter', error);
        throw error;
      });
  }

  getAllParameters(): Promise<Parameter[]> {
    return axios.get<Parameter[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching parameters', error);
        throw error;
      });
  }

  getParameterById(id: number): Promise<Parameter> {
    return axios.get<Parameter>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching parameter', error);
        throw error;
      });
  }

  deleteParameter(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error deleting parameter', error);
        throw error;
      });
  }

  updateParameter(id: number, parameter: Parameter): Promise<Parameter> {
    return axios.put<Parameter>(`${this.apiUrl}/${id}`, parameter, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error updating parameter', error);
        throw error;
      });
  }
}
