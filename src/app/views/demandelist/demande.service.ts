import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from './demande.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://your-api-endpoint/demandes'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl);
  }
}
