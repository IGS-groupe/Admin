import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomEchantillonComponent } from './fom-echantillon.component';

describe('FomEchantillonComponent', () => {
  let component: FomEchantillonComponent;
  let fixture: ComponentFixture<FomEchantillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FomEchantillonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FomEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
