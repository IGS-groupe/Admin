import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent  implements OnInit {
  clients: User[] = [];

  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getClient().then(users => {
      this.clients = users;
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }
}
