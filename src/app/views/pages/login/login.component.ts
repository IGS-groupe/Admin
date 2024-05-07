import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { 
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, 
  TextColorDirective, CardComponent, CardBodyComponent, FormDirective, 
  InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective 
} from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
      ContainerComponent, RowComponent, ColComponent, CardGroupComponent, 
      TextColorDirective, CardComponent, CardBodyComponent, FormDirective, 
      InputGroupComponent, InputGroupTextDirective, IconDirective, 
      FormControlDirective, ButtonDirective, NgStyle,ReactiveFormsModule,
      
    ]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  // Inject the Router service
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { 
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Define the onLogin method
  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      usernameOrEmail: this.loginForm.value.usernameOrEmail,
      password: this.loginForm.value.password
    };

    this.userService.login(loginData)
      .then(response => {
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('token', response.token);
        this.router.navigate(['/Listdemandes']);
      })
      .catch(error => {
        console.error('API Error:', error);
        this.error = 'An error occurred. Please try again.';
      });
  }
}