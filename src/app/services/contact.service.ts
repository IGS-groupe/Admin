// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Contact } from '../models/Contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiBase = 'http://localhost:4000/api';
  private http: AxiosInstance;

  constructor() {
    // Send HttpOnly JWT cookie automatically on every request
    this.http = axios.create({
      baseURL: this.apiBase,
      withCredentials: true
    });
  }

  // --- Read all
  getAllContacts(): Promise<Contact[]> {
    return this.http.get<Contact[]>('/contacts')
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching all contacts', err);
        throw err;
      });
  }

  // --- Read one
  getContactById(id: number): Promise<Contact> {
    return this.http.get<Contact>(`/contacts/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error fetching contact by id', err);
        throw err;
      });
  }

  // --- Update
  updateContact(id: number, contact: Contact): Promise<Contact> {
    return this.http.put<Contact>(`/contacts/${id}`, contact, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.data)
    .catch(err => {
      console.error('Error updating contact', err);
      throw err;
    });
  }

  // --- Delete
  deleteContact(id: number): Promise<void> {
    return this.http.delete<void>(`/contacts/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error('Error deleting contact', err);
        throw err;
      });
  }
}
