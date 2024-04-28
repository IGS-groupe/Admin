import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandelistComponent } from './demandelist.component';

describe('DemandelistComponent', () => {
  let component: DemandelistComponent;
  let fixture: ComponentFixture<DemandelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
