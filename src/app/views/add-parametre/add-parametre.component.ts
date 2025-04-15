import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ParameterService } from 'src/app/services/parameter.service';
import { Router } from '@angular/router';
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

<<<<<<< HEAD
  newParameter = { name: '', rdl: 0, unit: '', available: true };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parameterService: ParameterService,
    private router: Router
  ) {}
=======
  newParameter = { name: '', rdl: 0, unit: '' , available:true };
  error: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parameterService: ParameterService, private router: Router,
    // private toastr: ToastrService
  ) { 
    const userId = localStorage.getItem('AdminId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
  }
>>>>>>> d7d513868242138903625c265c19eb668a5f4266

  ngOnInit() {}

  submit(): void {
    if (this.newParameter.name && this.newParameter.rdl && this.newParameter.unit) {
      this.parameterService.saveParameter(this.newParameter).then(() => {
<<<<<<< HEAD
=======
        console.log('Parameter saved successfully');
>>>>>>> d7d513868242138903625c265c19eb668a5f4266
        this.newParameter = { name: '', rdl: 0, unit: '', available: true };
        this.router.navigate(['/ListParamater']);
      }).catch(error => {
        console.error('Failed to save parameter:', error);
        this.error = `Failed to save parameter: ${error}`;
      });
    } else {
      console.error('Validation failed: All fields are required');
      this.error = 'Validation failed: All fields are required';
    }
  }
}
