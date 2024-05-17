import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { 
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, 
  TextColorDirective, CardComponent, CardBodyComponent, FormDirective, 
  InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,
  ToasterPlacement,
  ToasterComponent,
  
} from '@coreui/angular';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
// import { ToastrService } from 'ngx-toastr';
import { Observable, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';
 // Required for using Observables
declare var $: any;

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
  loginForm!: FormGroup;  // Use non-null assertion operator
  error: string = '';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private toastr: ToastrService 
  ) { 
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // Define the onLogin method
  onLogin(): void {
    if (!this.loginForm.valid) {
      this.error = 'Please fill out all fields correctly.';
    }else{
      const loginData = {
        usernameOrEmail: this.loginForm.value.usernameOrEmail,
        password: this.loginForm.value.password
      };
  
      this.userService.login(loginData)
        .then(response => {
          const roles = response.roles;  // Correctly access roles
          if(!roles.includes("ROLE_USER")){
            console.log(response.token);
            localStorage.setItem('AdminId', response.userId.toString());
            localStorage.setItem('token', response.token);
            this.router.navigate(['/Listdemandes']);
          }else{
            this.error = 'Unauthorized access.';
          }
        })
        .catch(error => {
          console.error('API Error:', error);
          this.error = 'An error occurred. Please try again.';
        });
    }

    
  }
}
