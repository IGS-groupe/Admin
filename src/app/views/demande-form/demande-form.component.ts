import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { DemandeService } from '../../services/demande.service';
import { Demande } from '../demandelist/demande.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-demande-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.scss']
})
export class DemandeFormComponent implements OnInit {
  demandeForm!: FormGroup;
  clients: User[] = [];
  selectedFile: File | null = null;
  excelData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private demandeService: DemandeService
  ) {}

  ngOnInit(): void {
    this.demandeForm = this.fb.group({
      demandePour: ['', Validators.required],
      envoyeAuLaboratoire: ['', Validators.required],
      courrielsSupplementaires: [''],
      bonDeCommande: ['', Validators.required],
      langueDuCertificat: ['', Validators.required],
      commentairesInternes: ['']
    });

    this.loadClients();
  }

  loadClients(): void {
    this.userService.getClient().then(users => {
      this.clients = users;
    }).catch(error => {
      console.error('Error fetching clients:', error);
      this.router.navigate(['/login']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.readExcelFile(file);
    }
  }

  readExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.excelData = XLSX.utils.sheet_to_json(worksheet);
      this.processExcelData();
    };
    reader.readAsArrayBuffer(file);
  }

  processExcelData(): void {
    this.excelData.forEach(row => {
      const newDemande: Demande = {
        demandePour: row.demandePour || 'Unknown Unknown',
        envoyeAuLaboratoire: row.envoyeAuLaboratoire || '',
        courrielsSupplementaires: row.courrielsSupplementaires || '',
        bonDeCommande: row.bonDeCommande || '',
        unEchantillon: false,
        langueDuCertificat: row.langueDuCertificat || '',
        commentairesInternes: row.commentairesInternes || '',
        userId: row.userId
      };

      this.demandeService.createDemande(newDemande).then(saved => {
        console.log('✅ Demande importée:', saved);
      }).catch(error => {
        console.error('❌ Échec de l\'importation de la demande:', error);
      });
    });

    // Rediriger vers la liste après l'importation
    this.router.navigate(['/demandelist']);
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {
      const formValues = this.demandeForm.value;
      const selectedClient = formValues.demandePour;
      const selectedClient1 = this.clients.find(client => client.id == selectedClient);
      console.log('Selected client:', selectedClient1);
      const newDemande: Demande = {
        demandePour: selectedClient1 ? `${selectedClient1.firstName || 'Unknown'} ${selectedClient1.lastName || 'Unknown'}` : 'Unknown Unknown', // Concatenated string // Default values if client not found
        envoyeAuLaboratoire: formValues.envoyeAuLaboratoire,
        courrielsSupplementaires: formValues.courrielsSupplementaires,
        bonDeCommande: formValues.bonDeCommande,
        unEchantillon: false,
        langueDuCertificat: formValues.langueDuCertificat,
        commentairesInternes: formValues.commentairesInternes,
        userId: formValues.demandePour // ✅ Maps to DTO field
      };

      console.log('🚀 Sending to backend:', newDemande);

      this.demandeService.createDemande(newDemande).then(saved => {
        console.log('✅ Demande created:', saved);
        this.router.navigate(['/demandelist']);
      }).catch(error => {
        console.error('❌ Failed to submit demande:', error);
      });

    } else {
      this.demandeForm.markAllAsTouched();
    }
  }

  navigateToNext(): void {
    this.onSubmit();
  }
}
