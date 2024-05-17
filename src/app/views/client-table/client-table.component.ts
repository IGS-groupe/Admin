import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent  implements OnInit {
  clients: User[] = [];

  constructor(private userService: UserService,private router: Router) { 
    const userId = localStorage.getItem('userId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
  }

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
  disable(userId: number) {
    this.userService.disableUser(userId).then(response => {
      console.log('User disabled successfully', response);
      this.fetchUsers();
    }).catch(error => {
      console.error('Failed to disable user', error);
      // Handle errors, maybe show a message to the user
    });
  }
}
