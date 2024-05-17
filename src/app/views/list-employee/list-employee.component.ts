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
  Admins: User[] = [];

  constructor(private userService: UserService,private router: Router,) {
    const userId = localStorage.getItem('AdminId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
   }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAdmin().then(users => {
      this.Admins = users;
    }).catch(error => {
      console.error('Error fetching users:', error);
      this.router.navigate(['/login']);
    });
  }
  deleteAdmin(userId: number): void {
    this.userService.deleteUser(userId).then(() => {
      console.log('Admin deleted successfully');
      this.Admins = this.Admins.filter(admin => admin.id !== userId);  // Update the local Admins array to reflect the deletion
    }).catch(error => {
      console.error('Error deleting admin:', error);
    });
  }

  navigateToDashboard(): void {
    this.router.navigate(['/add_employee']);
  }
}
