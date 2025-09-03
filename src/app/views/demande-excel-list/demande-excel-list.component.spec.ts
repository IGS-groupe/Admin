import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeExcelListComponent } from './demande-excel-list.component';

describe('DemandeExcelListComponent', () => {
  let component: DemandeExcelListComponent;
  let fixture: ComponentFixture<DemandeExcelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeExcelListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeExcelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
