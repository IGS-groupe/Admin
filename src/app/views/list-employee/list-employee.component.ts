import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    CommonModule // Add CommonModule here
  ],
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent {
  clients: User[] = [];

  constructor(private userService: UserService,private router: Router,) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAdmin().then(users => {
      this.clients = users;
    }).catch(error => {
      console.error('Error fetching users:', error);
      this.router.navigate(['/login']);
    });
  }
  navigateToDashboard(): void {
    this.router.navigate(['/add_employee']);
  }
}
