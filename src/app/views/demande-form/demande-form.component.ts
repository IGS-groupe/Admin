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
      demandePour: [[], Validators.required], // Changed to array for multiple selection
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

        // Handle multiple clients (comma-separated IDs)
        const clientIds = row.demandePour.toString().split(',').map((id: string) => id.trim());
        
        for (const clientId of clientIds) {
          // Vérifier si le client existe
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
      const selectedClientIds = formValues.demandePour; // Array of client IDs
      
      if (!selectedClientIds || selectedClientIds.length === 0) {
        Swal.fire({
          title: 'Erreur',
          text: 'Veuillez sélectionner au moins un client',
          icon: 'error'
        });
        return;
      }

      // Create a demande for each selected client
      const demandes: Demande[] = selectedClientIds.map((clientId: any) => {
        const selectedClient = this.clients.find(client => client.id == clientId);
        console.log('Selected client:', selectedClient);
        
        return {
          demandePour: selectedClient ? `${selectedClient.firstName || 'Unknown'} ${selectedClient.lastName || 'Unknown'}` : 'Unknown Unknown',
          envoyeAuLaboratoire: formValues.envoyeAuLaboratoire,
          courrielsSupplementaires: formValues.courrielsSupplementaires,
          bonDeCommande: formValues.bonDeCommande,
          unEchantillon: false,
          langueDuCertificat: formValues.langueDuCertificat,
          commentairesInternes: formValues.commentairesInternes,
          userId: clientId
        };
      });

      console.log('🚀 Sending to backend:', demandes);

      // Submit all demandes
      this.submitMultipleDemandes(demandes);

    } else {
      this.demandeForm.markAllAsTouched();
    }
  }

  async submitMultipleDemandes(demandes: Demande[]): Promise<void> {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Confirmation',
        html: `Voulez-vous créer ${demandes.length} demande(s) pour les clients sélectionnés ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, créer',
        cancelButtonText: 'Annuler',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        // Submit each demande
        for (const demande of demandes) {
          await this.demandeService.createDemande(demande);
        }

        // Show success message
        await Swal.fire({
          title: 'Succès!',
          text: `${demandes.length} demande(s) ont été créée(s) avec succès`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

        // Navigate to list
        this.router.navigate(['/demandelist']);
      }
    } catch (error: any) {
      console.error('❌ Failed to submit demandes:', error);
      await Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la création des demandes',
        icon: 'error'
      });
    }
  }

  navigateToNext(): void {
    this.onSubmit();
  }

  // Utility methods for multi-select
  isClientSelected(clientId: any): boolean {
    const selectedClients = this.demandeForm.get('demandePour')?.value || [];
    return selectedClients.includes(clientId);
  }

  toggleClientSelection(clientId: any): void {
    const selectedClients = this.demandeForm.get('demandePour')?.value || [];
    const index = selectedClients.indexOf(clientId);
    
    if (index > -1) {
      // Remove client if already selected
      selectedClients.splice(index, 1);
    } else {
      // Add client if not selected
      selectedClients.push(clientId);
    }
    
    this.demandeForm.patchValue({ demandePour: selectedClients });
  }

  getSelectedClientsNames(): string {
    const selectedClientIds = this.demandeForm.get('demandePour')?.value || [];
    const selectedClients = this.clients.filter(client => 
      selectedClientIds.includes(client.id)
    );
    
    return selectedClients.map(client => 
      `${client.firstName} ${client.lastName}`
    ).join(', ');
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

    // Prendre les premiers clients ou utiliser des IDs d'exemple
    const client1 = this.clients[0] || { id: 'EXEMPLE_ID_1' };
    const client2 = this.clients[1] || { id: 'EXEMPLE_ID_2' };
    const client3 = this.clients[2] || { id: 'EXEMPLE_ID_3' };

    // Créer un exemple de données avec sélection simple et multiple
    const exampleData = [
      {
        demandePour: client1.id, // Single client
        envoyeAuLaboratoire: "Laboratoire A",
        courrielsSupplementaires: "email@example.com",
        bonDeCommande: "BON-001",
        langueDuCertificat: "FRANCAIS",
        commentairesInternes: "Commentaire exemple 1"
      },
      {
        demandePour: `${client2.id},${client3.id}`, // Multiple clients (comma-separated)
        envoyeAuLaboratoire: "Laboratoire B",
        courrielsSupplementaires: "contact@example.com",
        bonDeCommande: "BON-002",
        langueDuCertificat: "ANGLAIS",
        commentairesInternes: "Commentaire exemple 2 - pour plusieurs clients"
      }
    ];

    // Créer une feuille de calcul
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exampleData);

    // Ajouter des commentaires pour expliquer les champs
    ws['!cols'] = [
      { wch: 30 }, // demandePour (plus large pour les IDs multiples)
      { wch: 25 }, // envoyeAuLaboratoire
      { wch: 30 }, // courrielsSupplementaires
      { wch: 20 }, // bonDeCommande
      { wch: 20 }, // langueDuCertificat
      { wch: 50 }  // commentairesInternes (plus large)
    ];

    // Créer le classeur
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Demandes');

    // Ajouter une feuille d'instructions
    const instructionsData = [
      { Field: 'demandePour', Description: 'ID(s) du/des client(s). Pour plusieurs clients, séparez les IDs par des virgules', Example: 'CLIENT1,CLIENT2,CLIENT3' },
      { Field: 'envoyeAuLaboratoire', Description: 'Nom du laboratoire destinataire', Example: 'Laboratoire Central' },
      { Field: 'courrielsSupplementaires', Description: 'Emails supplémentaires (optionnel)', Example: 'contact@example.com' },
      { Field: 'bonDeCommande', Description: 'Numéro de bon de commande', Example: 'BON-12345' },
      { Field: 'langueDuCertificat', Description: 'Langue du certificat: FRANCAIS ou ANGLAIS', Example: 'FRANCAIS' },
      { Field: 'commentairesInternes', Description: 'Commentaires internes (optionnel)', Example: 'Commentaire...' }
    ];
    
    const instructionsWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(instructionsData);
    instructionsWs['!cols'] = [
      { wch: 25 }, // Field
      { wch: 60 }, // Description
      { wch: 30 }  // Example
    ];
    XLSX.utils.book_append_sheet(wb, instructionsWs, 'Instructions');

    // Télécharger le fichier
    XLSX.writeFile(wb, 'template_demandes_multi_clients.xlsx');

    // Afficher un message d'information
    Swal.fire({
      title: 'Template téléchargé',
      html: `Le template Excel a été téléchargé avec des exemples pour:<br>
             • Demande pour un seul client<br>
             • Demande pour plusieurs clients<br><br>
             <strong>Note:</strong> Pour sélectionner plusieurs clients, séparez les IDs par des virgules.`,
      icon: 'info',
      confirmButtonText: 'Compris'
    });
  }
}
