import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

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

  async processExcelData(): Promise<void> {
    try {
      // Valider toutes les données avant de commencer l'importation
      const demandes: Demande[] = [];
      for (const row of this.excelData) {
        // Vérifier si toutes les données requises sont présentes
        if (!row.demandePour || !row.envoyeAuLaboratoire || !row.bonDeCommande || !row.langueDuCertificat) {
          throw new Error('Données Excel invalides: Les champs demandePour, envoyeAuLaboratoire, bonDeCommande et langueDuCertificat sont obligatoires');
        }

        // Vérifier si le client existe
        const clientId = row.demandePour;
        const client = this.clients.find(c => c.id === clientId);
        
        if (!client) {
          throw new Error(`Client avec ID ${clientId} non trouvé`);
        }

        const newDemande: Demande = {
          demandePour: client ? `${client.firstName || 'Unknown'} ${client.lastName || 'Unknown'}` : 'Unknown Unknown',
          envoyeAuLaboratoire: row.envoyeAuLaboratoire,
          courrielsSupplementaires: row.courrielsSupplementaires || '',
          bonDeCommande: row.bonDeCommande,
          unEchantillon: false,
          langueDuCertificat: row.langueDuCertificat,
          commentairesInternes: row.commentairesInternes || '',
          userId: clientId
        };

        demandes.push(newDemande);
      }

      // Demander confirmation à l'utilisateur
      const result = await Swal.fire({
        title: 'Confirmation d\'importation',
        html: `Voulez-vous importer ${demandes.length} demande(s) ?<br>
              <small>Les demandes seront ajoutées à la base de données.</small>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, importer',
        cancelButtonText: 'Non, annuler',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        // Importer les demandes une par une
        for (const demande of demandes) {
          try {
            await this.demandeService.createDemande(demande);
          } catch (error: any) {
            console.error('❌ Erreur lors de l\'importation:', error);
            if (error.status === 400) {
              throw new Error(`Erreur de validation: ${error.error?.message || 'Données invalides'}`);
            }
            throw error;
          }
        }

        // Afficher le toast de succès
        await Swal.fire({
          title: 'Succès!',
          text: `${demandes.length} demande(s) ont été importée(s) avec succès`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

        // Rediriger vers la liste
        this.router.navigate(['/demandelist']);
      }
    } catch (error: any) {
      console.error('❌ Erreur lors du traitement:', error);
      // Afficher l'erreur à l'utilisateur
      await Swal.fire({
        title: 'Erreur',
        text: error.message || 'Une erreur est survenue lors de l\'importation',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
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

  generateExcelTemplate(): void {
    // Vérifier si nous avons des clients
    if (this.clients.length === 0) {
      Swal.fire({
        title: 'Attention',
        text: 'Aucun client disponible. Le template utilisera des IDs d\'exemple.',
        icon: 'warning'
      });
    }

    // Prendre les deux premiers clients ou utiliser des IDs d'exemple
    const client1 = this.clients[0] || { id: 'EXEMPLE_ID_1' };
    const client2 = this.clients[1] || { id: 'EXEMPLE_ID_2' };

    // Créer un exemple de données
    const exampleData = [
      {
        demandePour: client1.id,
        envoyeAuLaboratoire: "Laboratoire A",
        courrielsSupplementaires: "email@example.com",
        bonDeCommande: "BON-001",
        langueDuCertificat: "FRANCAIS",
        commentairesInternes: "Commentaire exemple 1"
      },
      {
        demandePour: client2.id,
        envoyeAuLaboratoire: "Laboratoire B",
        courrielsSupplementaires: "contact@example.com",
        bonDeCommande: "BON-002",
        langueDuCertificat: "ANGLAIS",
        commentairesInternes: "Commentaire exemple 2"
      }
    ];

    // Créer une feuille de calcul
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exampleData);

    // Ajouter des commentaires pour expliquer les champs
    ws['!cols'] = [
      { wch: 20 }, // demandePour
      { wch: 25 }, // envoyeAuLaboratoire
      { wch: 30 }, // courrielsSupplementaires
      { wch: 20 }, // bonDeCommande
      { wch: 20 }, // langueDuCertificat
      { wch: 40 }  // commentairesInternes
    ];

    // Créer le classeur
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Demandes');

    // Télécharger le fichier
    XLSX.writeFile(wb, 'template_demandes.xlsx');
  }
}
