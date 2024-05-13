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
  selector: 'app-list-paramater',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './list-paramater.component.html',
  styleUrl: './list-paramater.component.scss'
})
export class ListParamaterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'rdl', 'unit', 'available'];
  dataSource = new MatTableDataSource<Parameter>();
  selection = new SelectionModel<Parameter>(true, []);
  newParameter = { name: '', rdl: 0, unit: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parameterService: ParameterService , private router: Router) { }

  ngOnInit() {
    this.fetchParameters();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchParameters(): void {
    this.parameterService.getAllParameters().then(parameters => {
      this.dataSource.data = parameters;
    }).catch(error => {
      console.error('Error fetching parameters:', error);
      this.router.navigate(['/login']);
    });
  }



  toggleAnalyteSelection(row: Parameter): void {
    this.selection.toggle(row);
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  updateAvailability(parameter: Parameter): void {
    this.parameterService.updateParameterAvailability(parameter.parameterId!, !parameter.available)
      .then(updatedParameter => {
        const index = this.dataSource.data.findIndex(p => p.parameterId === updatedParameter.parameterId);
        if (index !== -1) {
          this.dataSource.data[index].available = updatedParameter.available;
        }
      })
      .catch(error => {
        console.error('Error updating parameter availability:', error);
      });
  }
  submitAnalytes(): void {
    const selectedParameters = this.selection.selected;
    console.log('Submitted analytes:', selectedParameters);
  }
  onAddButtonClick(){
    this.router.navigate(['/add_parametre']);
  }
}
