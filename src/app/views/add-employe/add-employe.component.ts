import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent {
  formData: User = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    genre: '',
    phoneNumber:'',
    active: true  // Ensure 'active' is included from the start
  };
  constructor(private router: Router,private authService: UserService) { }

  registerAdmin(): void {
    this.authService.registerAdmin(this.formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/Employess']);
        // Handle further actions like redirecting the user or displaying success message
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Handle errors, e.g., display an error message
      }
    });
  }
  handleSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
