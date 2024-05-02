import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    calcification: '',
    startDate: '',
    specialite: ''
  };

  handleSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
