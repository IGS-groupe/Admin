import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { ParameterService } from 'src/app/services/parameter.service';
import { Parameter } from 'src/app/models/parameter.model';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-parametre',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './add-parametre.component.html',
  styleUrls: ['./add-parametre.component.scss']
})
export class AddParametreComponent implements OnInit {

  newParameter = { name: '', rdl: 0, unit: '' , available:true };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parameterService: ParameterService, private router: Router,
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
  
  }


  addParameter(): void {
   
  }

  
  submit(): void {
    if (this.newParameter.name && this.newParameter.rdl && this.newParameter.unit) {
      this.parameterService.saveParameter(this.newParameter).then(() => {
        console.log('Parameter saved successfully');
        this.newParameter = { name: '', rdl: 0, unit: '', available: true };
        // this.toastr.success('Parameter saved successfully!', 'Success', {
        //   positionClass: 'toast-top-center',
        //   timeOut: 3000,
        //   closeButton: true
        // });
        this.router.navigate(['/ListParamater']);
      }).catch(error => {
        console.error('Failed to save parameter:', error);
        // this.toastr.error('', 'Failed to save parameter:', {
        //   positionClass: 'toast-top-center',
        //   timeOut: 3000,
        //   closeButton: true
        // });
      });
    } else {
      console.error('Validation failed: All fields are required');
      // this.toastr.error('Please check the form for errors.', 'Invalid Form', {
      //   positionClass: 'toast-top-center',
      //   timeOut: 3000,
      //   closeButton: true
      // });
    }
  }
}
