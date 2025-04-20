import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/Contact.model'; // Adjust the import path as needed
import { ContactService } from '../../services/contact.service'; // Adjust the import path as needed
import { Router } from '@angular/router';
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService,private router: Router) {
    const userId = localStorage.getItem('AdminId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
  }

  ngOnInit() {
    this.loadContacts();
  }

  private loadContacts(): void {
    this.contactService.getAllContacts()
      .then(contacts => this.contacts = contacts)
      .catch(error => console.error('Failed to load contacts:', error));
  }
}
