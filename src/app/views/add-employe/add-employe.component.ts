import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
// import { ToastrService } from 'ngx-toastr';
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
  constructor(private router: Router,private authService: UserService,
    // private toastr: ToastrService
  ) { }

  registerAdmin(): void {
    this.authService.registerAdmin(this.formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        // this.toastr.success('Admin added successfully!', 'Success', {
        //   positionClass: 'toast-top-center',
        //   timeOut: 3000,
        //   closeButton: true
        // });
        this.router.navigate(['/Employess']);
        // Handle further actions like redirecting the user or displaying success message
      },
      error: (error) => {
        // console.error('Registration failed:', error);
        // this.toastr.error(error, 'Registration Failed', {
        //   positionClass: 'toast-top-center',
        //   timeOut: 3000,
        //   closeButton: true
        // });
      }
    });
  }
  handleSubmit(): boolean {
    if (!this.formData.firstName?.trim() || 
        !this.formData.lastName?.trim() ||
        !this.formData.username?.trim() || 
        !this.formData.email?.trim() ||
        !this.formData.password?.trim() || 
        !this.formData.phoneNumber?.trim() ||
        this.formData.genre === '') {
          // this.toastr.error('Please check the form for errors.', 'Invalid Form', {
          //   positionClass: 'toast-top-center',
          //   timeOut: 3000,
          //   closeButton: true
          // });
    }
    this.registerAdmin();
    return true;
}

}
