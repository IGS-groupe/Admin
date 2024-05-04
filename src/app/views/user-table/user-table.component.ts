import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getClient().then(users => {
      this.users = users;
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }

  editUser(user: User): void {
    // Logic to edit user
    console.log('Edit user:', user);
    // You might need to implement a PUT or PATCH request in UserService if not already done
  }

  deleteUser(userId: number): void {
    // Logic to delete user
    console.log('Delete user ID:', userId);
    // You might need to implement a DELETE request in UserService if not already done
  }
}
