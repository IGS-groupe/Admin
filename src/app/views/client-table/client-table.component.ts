import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent implements OnInit {
  clients: User[] = [];
  nameFilter: string = '';
  emailFilter: string = '';
  selectedClient: User | null = null;
  showModal = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getClient().then(users => {
      this.clients = users;
    }).catch(error => {
      console.error('Error fetching users:', error);
      this.router.navigate(['/login']);
    });
  }

  filteredClients(): User[] {
    return this.clients.filter(client =>
      client.firstName?.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      client.email?.toLowerCase().includes(this.emailFilter.toLowerCase())
    );
  }

  openConfirmationModal(client: User) {
    this.selectedClient = client;
    this.showModal = true;
  }

  confirmDisable() {
    if (this.selectedClient) {
      this.userService.disableUser(this.selectedClient.id).then(() => {
        this.fetchUsers();
        this.closeModal();
      }).catch(error => {
        console.error('Failed to disable user', error);
      });
    }
  }
  navigateToUpdateClient(clientId: number) {
    this.router.navigate(['/update-client', clientId]);
  }

  closeModal() {
    this.showModal = false;
    this.selectedClient = null;
  }
}
