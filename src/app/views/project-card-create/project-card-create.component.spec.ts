import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardCreateComponent } from './project-card-create.component';

describe('ProjectCardCreateComponent', () => {
  let component: ProjectCardCreateComponent;
  let fixture: ComponentFixture<ProjectCardCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
