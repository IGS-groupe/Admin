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
  private getAuthHeaders() {
    const token = localStorage.getItem('Admintoken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
  getClient(): Promise<User[]> {
    const token = localStorage.getItem('Admintoken');
    console.log(token); // Retrieve the token from localStorage
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
    const token = localStorage.getItem('Admintoken'); // Retrieve the token from localStorage
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
    const token = localStorage.getItem('Admintoken');
    return from(axios.post(`${this.apiUrl}/users/signupAdmin`, signUpData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.data)
      .catch(error => {
        console.error('Error disabling user account', error);
        throw error;
      })
    );
  }
  disableUser(userId: number): Promise<any> {
    const token = localStorage.getItem('Admintoken');
    return axios.put(`${this.apiUrl}/users/disable/${userId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.data)
      .catch(error => {
        console.error('Error disabling user account', error);
        throw error;
      });
  }
  isAdmin(): Promise<boolean> {
    const token = localStorage.getItem('Admintoken');
    return axios.get<User[]>(`${this.apiUrl}/users/role/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      return true;
    }).catch(error => {
      console.error('Error fetching users', error);
      return false;
    });
  }

  getUserById(id: number): Observable<User> {
    return from(axios.get<User>(`${this.apiUrl}/users/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data));
  }

  // Get users by role using Axios
  getUsersByRole(role: string): Observable<User[]> {
    return from(axios.get<User[]>(`${this.apiUrl}/users/role/${role}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data));
  }

  // Create new user using Axios
  createUser(user: User): Observable<User> {
    return from(axios.post<User>(`${this.apiUrl}/users`, user, {
      headers: this.getAuthHeaders()
    }).then(response => response.data));
  }

  // Update user using Axios
  updateUser(id: number, user: User): Observable<User> {
    return from(axios.put<User>(`${this.apiUrl}/users/${id}`, user, {
      headers: this.getAuthHeaders()
    }).then(response => response.data));
  }
  updateUserWithFile(id: number, formData: FormData): Observable<User> {
  return from(
    axios.put<User>(`${this.apiUrl}/users/${id}/with-file`, formData, {
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => response.data)
  );
}

  // Delete user using Axios
  deleteUser(userId: number): Promise<any> {
    const token = localStorage.getItem('Admintoken');
    return axios.delete(`${this.apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.data)
      .catch(error => {
        console.error('Error deleting user', error);
        throw error;
      });
  }

  // Disable user using Axios
  toggleUserActive(id: number): Observable<string> {
    return from(axios.put<string>(`${this.apiUrl}/users/disable/${id}`, null, {
      headers: this.getAuthHeaders()
    }).then(response => response.data));
  }

  // Change user password using Axios
  changePassword(usernameOrEmail: string, password: string, newPassword: string): Observable<any> {
    const body = {
      usernameOrEmail,
      password,
      newPassword
    };
    return from(axios.put<any>(`${this.apiUrl}/users/change-password`, body, {
      headers: this.getAuthHeaders()
    }).then(response => response.data));
  }
  logout(): Promise<any> {
    return axios.post<any>(`${this.apiUrl}/auth/logout`, {}, {
      headers: this.getAuthHeaders()
    }).then(response => {
      localStorage.removeItem('token');  // Client-side cleanup
      return response.data;
    }).catch(error => {
      console.error('Error during logout', error);
      throw error;
    });
  }

}
