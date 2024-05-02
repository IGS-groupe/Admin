import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParametreComponent } from './add-parametre.component';

describe('AddParametreComponent', () => {
  let component: AddParametreComponent;
  let fixture: ComponentFixture<AddParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParametreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
