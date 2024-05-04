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

@Component({
  selector: 'app-add-parametre',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './add-parametre.component.html',
  styleUrls: ['./add-parametre.component.scss']
})
export class AddParametreComponent implements OnInit {

  newParameter = { name: '', rdl: 0, unit: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parameterService: ParameterService, private router: Router) { }

  ngOnInit() {
  
  }


  addParameter(): void {
    if (this.newParameter.name && this.newParameter.rdl && this.newParameter.unit) {
      this.parameterService.saveParameter(this.newParameter).then(parameter => {
        this.newParameter = { name: '', rdl: 0, unit: '' }; 
        this.router.navigate(['/ListParamater']);// Reset the form fields
      }).catch(error => {
        console.error('Failed to save parameter:', error);
      });
    }
  }

  
  submitAnalytes(): void {
   
  }
}
