import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
// import { ToastrService } from 'ngx-toastr';  // Adjust import according to actual service used
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  passwordForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.checkPasswords });

  userId: number = Number(localStorage.getItem('userId'));

  constructor(private fb: FormBuilder, private userService: UserService, 
    // private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: User) => {
          this.profileForm.patchValue(user);
        },
        error: (err) => {
          console.error('Failed to fetch user:', err);
          // this.toastr.error('Failed to fetch user details.');
        }
      });
    }
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
        next: () => {
          // this.toastr.success('Profile updated successfully');
        },
        error: (error) => {
          console.error('Failed to update profile:', error);
          // this.toastr.error('Failed to update profile.');
        }
      });
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      const { password, newPassword } = this.passwordForm.value;
      this.userService.changePassword(this.profileForm.value.email, password, newPassword).subscribe({
        next: (response) => {
          if (response.message === "Password updated successfully.") {
            // this.toastr.success(response.message);
            this.passwordForm.reset();
          } else {
            // this.toastr.error(response.message || 'Unknown error occurred.');
          }
        },
        error: (error) => {
          console.error('Failed to update password:', error);
          // this.toastr.error('Failed to update password.');
        }
      });
    } else {
      // this.toastr.error('Please fill all required fields.');
    }
  }
}
