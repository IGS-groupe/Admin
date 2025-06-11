import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { DemandeService } from 'src/app/services/demande.service';
import { Demande } from '../demandelist/demande.model';

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
