import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

<<<<<<< HEAD
  constructor(private userService: UserService, private router: Router) {}
=======
  constructor(private userService: UserService,private router: Router) { 
    const userId = localStorage.getItem('AdminId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
  }
>>>>>>> d7d513868242138903625c265c19eb668a5f4266

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

  closeModal() {
    this.showModal = false;
    this.selectedClient = null;
  }
}
