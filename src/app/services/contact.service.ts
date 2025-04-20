import { Injectable } from '@angular/core';
import axios from 'axios';
import { Contact } from '../models/Contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
// src/app/services/contact.service.ts// Adjust the path and name as necessary
  private apiUrl = 'http://localhost:4000/api/contacts'; // Adjust this to your actual API endpoint

  constructor() { }

  private getAuthHeaders() {
    const token = localStorage.getItem('Admintoken'); // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  getAllContacts(): Promise<Contact[]> {
    return axios.get<Contact[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching all contacts', error);
        throw error;
      });
  }

  getContactById(id: number): Promise<Contact> {
    return axios.get<Contact>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error fetching contact by id', error);
        throw error;
      });
  }

  updateContact(id: number, contact: Contact): Promise<Contact> {
    return axios.put<Contact>(`${this.apiUrl}/${id}`, contact, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error updating contact', error);
        throw error;
      });
  }

  deleteContact(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).then(response => response.data)
      .catch(error => {
        console.error('Error deleting contact', error);
        throw error;
      });
  }
  }
