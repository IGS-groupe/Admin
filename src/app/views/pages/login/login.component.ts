import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { 
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, 
  TextColorDirective, CardComponent, CardBodyComponent, FormDirective, 
  InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective 
} from '@coreui/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
      ContainerComponent, RowComponent, ColComponent, CardGroupComponent, 
      TextColorDirective, CardComponent, CardBodyComponent, FormDirective, 
      InputGroupComponent, InputGroupTextDirective, IconDirective, 
      FormControlDirective, ButtonDirective, NgStyle
    ]
})
export class LoginComponent {
  // Inject the Router service
  constructor(private router: Router) { }

  // Define the onLogin method
  onLogin(): void {
    // Simulate login validation
    // You would replace this with your actual authentication logic
    // Navigate to the dashboard after login
    this.router.navigate(['/invoice']);
  }
}
