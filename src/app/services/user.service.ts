// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api'; // Adjust this to your API URL

  constructor() {}

  getClient(): Promise<User[]> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return axios.get<User[]>(`${this.apiUrl}/users/role/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching users', error);
        throw error;
      });
  }

  getAdmin(): Promise<User[]> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return axios.get<User[]>(`${this.apiUrl}/users/role/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching users', error);
        throw error;
      });
  }

  login(formData: any): Promise<any> {
    return axios.post<any>(`${this.apiUrl}/auth/signin`, formData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error logging in', error);
        throw error;
      });
  }
  registerAdmin(signUpData: User): Observable<any> {
    return from(axios.post(`${this.apiUrl}/auth/signupAdmin`, signUpData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.data));
  }
  get isAdmin(): Promise<boolean> {
    const token = localStorage.getItem('token');
    return axios.get<User[]>(`${this.apiUrl}/users/role/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      // Assuming the response will be an array of users with at least one admin
      return response.data.length > 0;
    }).catch(error => {
      console.error('Error fetching users', error);
      return false; // Return false if there is an error fetching users
    });
  }
}
