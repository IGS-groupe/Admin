import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  Admins: User[] = [];
  nameFilter: string = '';
  emailFilter: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAdmin().then(users => {
      this.Admins = users;
    }).catch(error => {
      console.error('Error fetching admins:', error);
      this.router.navigate(['/login']);
    });
  }

  deleteAdmin(userId: number): void {
    this.userService.deleteUser(userId).then(() => {
      this.Admins = this.Admins.filter(admin => admin.id !== userId);
    }).catch(error => {
      console.error('Error deleting admin:', error);
    });
  }

  navigateToDashboard(): void {
    this.router.navigate(['/add_employee']);
  }

  filteredAdmins(): User[] {
    return this.Admins.filter(admin =>
      admin.firstName?.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      admin.email?.toLowerCase().includes(this.emailFilter.toLowerCase())
    );
  }
}
