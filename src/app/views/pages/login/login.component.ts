import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
  TextColorDirective, CardComponent, CardBodyComponent, FormDirective,
  InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective
} from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

declare var $: any;

interface LoginResponse {
  userId: number;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
    TextColorDirective, CardComponent, CardBodyComponent, FormDirective,
    InputGroupComponent, InputGroupTextDirective, IconDirective,
    FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, CommonModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    // Optional: clear only admin-related client cache (we don't clear cookies here)
    localStorage.removeItem('AdminId');
    localStorage.removeItem('AdminName');
    localStorage.removeItem('AdminRoles');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // backend accepts username or email in the same field, so just require a value
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.error = 'Please fill out all fields correctly.';
      return;
    }

    const loginData = {
      usernameOrEmail: this.loginForm.value.usernameOrEmail,
      password: this.loginForm.value.password
    };

    // userService.login() must be configured with withCredentials:true and backend sets the HttpOnly cookie
    this.userService.login(loginData)
      .then((response: LoginResponse) => {
        const roles = response.roles ?? [];

        const isAdmin =
          roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPER_ADMIN');

        if (!isAdmin) {
          this.error = 'You do not have permission to access the admin area.';
          return;
        }

        // no token in localStorage — JWT is in HttpOnly cookie
        localStorage.setItem('AdminId', String(response.userId));
        if (response.firstName || response.lastName) {
          localStorage.setItem('AdminName', `${response.firstName ?? ''} ${response.lastName ?? ''}`.trim());
        }
        localStorage.setItem('AdminRoles', JSON.stringify(roles));

        this.error = '';
        this.router.navigate(['/Listdemandes']);
      })
      .catch((err) => {
        console.error('API Error:', err);
        // try to surface backend message if present
        const backendMsg =
          err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          'An error occurred. Please try again.';
        this.error = backendMsg;
      });
  }
}
