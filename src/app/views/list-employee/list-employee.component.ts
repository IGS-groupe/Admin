import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

<<<<<<< HEAD
  constructor(private userService: UserService, private router: Router) {}
=======
  constructor(private userService: UserService,private router: Router,) {
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
