// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Observable, from } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api';
  private http: AxiosInstance;

  constructor() {
    // All requests will include cookies automatically
    this.http = axios.create({
      baseURL: this.apiUrl,
      withCredentials: true
    });
  }

  // ---------- AUTH ----------
  login(formData: any): Promise<any> {
    // Backend sets HttpOnly cookie
    return this.http.post(`/auth/signin`, formData)
      .then(res => res.data)
      .catch(error => { console.error('Error logging in', error); throw error; });
  }

  logout(): Promise<any> {
    // Backend clears the cookie
    return this.http.post(`/auth/logout`, {})
      .then(res => res.data)
      .catch(error => { console.error('Error during logout', error); throw error; });
  }

  // ---------- ROLE HELPERS ----------
  getClient(): Promise<User[]> {
    return this.http.get<User[]>(`/users/role/user`)
      .then(res => res.data)
      .catch(error => { console.error('Error fetching users', error); throw error; });
  }

  getAdmin(): Promise<User[]> {
    return this.http.get<User[]>(`/users/role/admin`)
      .then(res => res.data)
      .catch(error => { console.error('Error fetching users', error); throw error; });
  }

  // Prefer checking roles from /users/me (cookie-based)
  async isAdmin(): Promise<boolean> {
    const token = localStorage.getItem('Admintoken');
    if (!token) {
      return false; // No token means not logged in
    }

    try {
      const user = await this.getMe();
      return user.roles.includes('ROLE_SUPER_ADMIN');
    } catch (error) {
      console.error('Error checking admin status', error);
      return false;
    }
  }

  async getMe(): Promise<any> {
      const token = localStorage.getItem('Admintoken');
      if (!token) throw new Error('No token found');

      const res = await axios.get('http://localhost:4000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  // ---------- USERS CRUD ----------
  getUserById(id: number): Observable<User> {
    return from(
      this.http.get<User>(`/users/${id}`)
        .then(res => res.data)
    );
  }

  getUsersByRole(role: string): Observable<User[]> {
    return from(
      this.http.get<User[]>(`/users/role/${role}`)
        .then(res => res.data)
    );
  }

  createUser(user: User): Observable<User> {
    return from(
      this.http.post<User>(`/users`, user, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return from(
      this.http.put<User>(`/users/${id}`, user, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }

  updateUserWithFile(id: number, formData: FormData): Observable<User> {
    // Let axios set the multipart boundary automatically
    return from(
      this.http.put<User>(`/users/${id}/with-file`, formData)
        .then(res => res.data)
    );
  }

  deleteUser(userId: number): Promise<any> {
    return this.http.delete(`/users/${userId}`)
      .then(res => res.data)
      .catch(error => { console.error('Error deleting user', error); throw error; });
  }

  toggleUserActive(id: number): Observable<string> {
    return from(
      this.http.put<string>(`/users/disable/${id}`, null)
        .then(res => res.data as unknown as string)
    );
  }

  changePassword(usernameOrEmail: string, password: string, newPassword: string): Observable<any> {
    const body = { usernameOrEmail, password, newPassword };
    return from(
      this.http.put<any>(`/users/change-password`, body, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }
  disableUser(userId: number): Promise<any> {
    return this.http.put(`/users/disable/${userId}`, null)
      .then(res => res.data)
      .catch(err => { console.error('Error disabling user account', err); throw err; });
  }
  registerAdmin(signUpData: User): Observable<any> {
    return from(
      this.http.post(`/users/signupAdmin`, signUpData, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.data)
    );
  }
}
