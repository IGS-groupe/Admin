import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import { Router } from '@angular/router';
import { ParameterService } from '../../services/parameter.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-parametre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-parametre.component.html',
  styleUrls: ['./add-parametre.component.scss']
})
export class AddParametreComponent implements OnInit {

  newParameter = { name: '', rdl: 0, unit: '', available: true };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parameterService: ParameterService,
    private router: Router
  ) {}

  ngOnInit() {}

  submit(): void {
    if (this.newParameter.name && this.newParameter.rdl && this.newParameter.unit) {
      this.parameterService.saveParameter(this.newParameter).then(() => {
        this.newParameter = { name: '', rdl: 0, unit: '', available: true };
        this.router.navigate(['/ListParamater']);
      }).catch(error => {
        console.error('Failed to save parameter:', error);
        // this.error = `Failed to save parameter: ${error}`;
      });
    } else {
      console.error('Validation failed: All fields are required');
      // this.error = 'Validation failed: All fields are required';
    }
  }
}
