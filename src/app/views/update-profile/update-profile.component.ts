import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  userId: number;
  generalError: string = '';
  profileError: string = '';
  passwordError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userId = Number(localStorage.getItem('AdminId'));
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.checkAuthentication();
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: User) => this.profileForm.patchValue(user),
        error: (err) => this.generalError = 'Failed to fetch user details.'
      });
    }
  }

  checkAuthentication() {
    if (!this.userId) {
      // Redirect to login or show an error
    }
  }

  checkPasswords(group: FormGroup): { [key: string]: any } | null {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
        next: () => this.profileError = '',
        error: (error) => this.profileError = 'Failed to update profile.'
      });
    } else {
      this.profileError = 'Please fill all required fields.';
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      const { password, newPassword } = this.passwordForm.value;
      this.userService.changePassword(this.profileForm.value.email, password, newPassword).subscribe({
        next: () => this.passwordError = '',
        error: (error) => this.passwordError = 'Failed to update password.'
      });
    } else {
      this.passwordError = 'Please fill all required fields.';
    }
  }
}
