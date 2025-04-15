import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator
} from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

import { ParameterService } from 'src/app/services/parameter.service';
import { Parameter } from 'src/app/models/parameter.model';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-list-paramater',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule, // ✅ Required for mat-form-field and mat-label
    MatInputModule,
    MatSlideToggleModule 
  ],
  templateUrl: './list-paramater.component.html',
  styleUrls: ['./list-paramater.component.scss']
})
export class ListParamaterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'rdl', 'unit', 'available'];
  dataSource = new MatTableDataSource<Parameter>();
  selection = new SelectionModel<Parameter>(true, []);
  nameFilter: string = '';
  unitFilter: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

<<<<<<< HEAD
  constructor(
    private parameterService: ParameterService,
    private router: Router
  ) {}
=======
  constructor(private parameterService: ParameterService , private router: Router) {
    const userId = localStorage.getItem('AdminId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }
   }
>>>>>>> d7d513868242138903625c265c19eb668a5f4266

  ngOnInit() {
    this.fetchParameters();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchParameters(): void {
    this.parameterService
      .getAllParameters()
      .then(parameters => {
        this.dataSource.data = parameters;
      })
      .catch(error => {
        console.error('Error fetching parameters:', error);
        this.router.navigate(['/login']);
      });
  }

  get filteredData(): Parameter[] {
    return this.dataSource.data.filter(param =>
      param.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      param.unit.toLowerCase().includes(this.unitFilter.toLowerCase())
    );
  }

  toggleAnalyteSelection(row: Parameter): void {
    this.selection.toggle(row);
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  updateAvailability(parameter: Parameter): void {
    this.parameterService
      .updateParameterAvailability(
        parameter.parameterId!,
        !parameter.available
      )
      .then(updatedParameter => {
        const index = this.dataSource.data.findIndex(
          p => p.parameterId === updatedParameter.parameterId
        );
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

  onAddButtonClick(): void {
    this.router.navigate(['/add_parametre']);
  }
}
