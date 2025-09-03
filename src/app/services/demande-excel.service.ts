// src/app/services/demande-excel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- DTO to match DemandeExcelFile entity
export interface DemandeExcelFile {
  id: number;
  originalName: string;
  storedName: string;
  storedPath: string;
  contentType: string;
  size: number;
  uploadedAt: string;
  uploadedByUserId?: number;
  demandeId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DemandeExcelService {
  private apiUrl = 'http://localhost:4000/api/demandesExcel'; // ✅ adjust backend port if different

  constructor(private http: HttpClient) {}

  // --- Upload single Excel
  uploadSingle(demandeId: number, file: File): Observable<DemandeExcelFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DemandeExcelFile>(`${this.apiUrl}/${demandeId}/excel`, formData, { withCredentials: true });
  }

  // --- Upload multiple Excels
  uploadMany(demandeId: number, files: File[]): Observable<DemandeExcelFile[]> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post<DemandeExcelFile[]>(`${this.apiUrl}/${demandeId}/excel/batch`, formData, { withCredentials: true });
  }

  // --- List files of a demande
  listFiles(demandeId: number): Observable<DemandeExcelFile[]> {
    return this.http.get<DemandeExcelFile[]>(`${this.apiUrl}/${demandeId}/excel`, { withCredentials: true });
  }

  // --- Delete file by id
  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/excel/${fileId}`, { withCredentials: true });
  }
}
