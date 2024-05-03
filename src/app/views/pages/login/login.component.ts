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
import { HttpClientModule } from '@angular/common/http';

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
      HttpClientModule 
    ]
})
export class LoginComponent {
  loginForm: FormGroup;
  // error: string = '';
  // Inject the Router service
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Username field with required validation
      password: ['', Validators.required]  // Password field with required validation
    });
  }

  // Define the onLogin method
  onLogin(): void {
  //  // If form is invalid, return
  //  if (this.loginForm.invalid) {
  //   return;
  // }

  // // Send login request
  // this.userService.login(this.loginForm.value)
  //   .subscribe(
  //     (response) => {
  //       // Handle successful login response
  //       // For example, navigate to dashboard
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error) => {
  //       console.error('API Error:', error);
  //       this.error = 'An error occurred. Please try again.'; // Display error message
  //     }
  //   );
  //   this.router.navigate(['/invoice']);
  }
}