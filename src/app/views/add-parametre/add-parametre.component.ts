import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ParameterService } from 'src/app/services/parameter.service';
import { Parameter } from 'src/app/models/parameter.model';
@Component({
  selector: 'app-add-parametre',
  standalone: true,
  imports: [FormsModule,CommonModule],  // Add FormsModule to standalone component imports
  templateUrl: './add-parametre.component.html',
  styleUrls: ['./add-parametre.component.scss']
})
export class AddParametreComponent implements OnInit  {
  parameters: Parameter[] = [];  // Array to store parameters
  newParameter = { name: '', rdl: 0, unit: '' };  // Object to hold the form data

  constructor(private parameterService: ParameterService) { }

  ngOnInit() {
    this.fetchParameter();
  }

  fetchParameter(): void {
    this.parameterService.getAllParameters().then(parameters => {
      this.parameters = parameters;
    }).catch(error => {
      console.error('Error fetching parameters:', error);
    });
  }
  // Method to add a new parameter
  addParameter() {
    if (this.newParameter.name && this.newParameter.rdl && this.newParameter.unit) {
      this.parameterService.saveParameter(this.newParameter).then(parameter => {
        this.parameters.push(parameter); // Add the newly saved parameter to the local list
        this.newParameter = { name: '', rdl: 0, unit: '' }; // Reset the form fields
      }).catch(error => {
        console.error('Failed to save parameter:', error);
      });
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
    console.log('Submitted analytes:', this.parameters.filter(p => p.id));
  }
}
