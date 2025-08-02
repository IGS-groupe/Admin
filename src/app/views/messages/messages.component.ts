import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/Contact.model'; // Adjust the import path as needed
import { ContactService } from '../../services/contact.service'; // Adjust the import path as needed
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  contacts: Contact[] = [];
  loading = false;

  constructor(private contactService: ContactService, private router: Router) {
    const userId = localStorage.getItem('AdminId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
  }

  ngOnInit() {
    this.loadContacts();
  }

  async loadContacts(): Promise<void> {
  this.loading = true;
  try {
    this.contacts = await this.contactService.getAllContacts();
  } catch (error) {
    console.error('Failed to load contacts:', error);
    await Swal.fire({
      title: 'Erreur de chargement',
      text: 'Impossible de charger les messages. Veuillez réessayer.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } finally {
    this.loading = false;
  }
}




  async deleteMessage(contact: Contact): Promise<void> {
    const result = await Swal.fire({
      title: 'Confirmer la suppression',
      html: `Êtes-vous sûr de vouloir supprimer le message de <strong>${contact.name}</strong> ?<br>
             <small class="text-muted">Cette action est irréversible.</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        // Show loading
        Swal.fire({
          title: 'Suppression en cours...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          }
        });

        await this.contactService.deleteContact(contact.id!);
        
        // Remove the contact from the local array
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        
        // Show success message
        await Swal.fire({
          title: 'Supprimé!',
          text: 'Le message a été supprimé avec succès.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

      } catch (error) {
        console.error('Error deleting contact:', error);
        
        // Show error message
        await Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression du message.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }

  formatDate(date: string | Date): string {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('fr-FR') + ' à ' + d.toLocaleTimeString('fr-FR');
  }
}
