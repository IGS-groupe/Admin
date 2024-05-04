import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParamaterComponent } from './list-paramater.component';

describe('ListParamaterComponent', () => {
  let component: ListParamaterComponent;
  let fixture: ComponentFixture<ListParamaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListParamaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListParamaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
