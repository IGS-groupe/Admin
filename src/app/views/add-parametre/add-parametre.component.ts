import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-add-parametre',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule to standalone component imports
  templateUrl: './add-parametre.component.html',
  styleUrls: ['./add-parametre.component.scss']
})
export class AddParametreComponent {
  parameters: any[] = [];  // Array to store parameters
  newParameter = { name: '', rdl: '', unit: '' };  // Object to hold the form data

  constructor() {}

  // Method to add a new parameter
  addParameter() {
    if (this.newParameter.name && this.newParameter.rdl && this.newParameter.unit) {
      this.parameters.push({...this.newParameter});
      this.newParameter = { name: '', rdl: '', unit: '' };  // Reset the form fields
      // You may want to implement functionality to actually save these to a database or service
    }
  }

  // Method to toggle analyte selection
  toggleAnalyteSelection(analyte: any) {
    // Implement your logic to handle checkbox toggle
    console.log('Toggled selection for:', analyte);
  }

  // Method to submit selected analytes
  submitAnalytes() {
    // Implement your logic to submit selected analytes
    console.log('Submitted analytes:', this.parameters.filter(p => p.isSelected));
  }
}
