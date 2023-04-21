import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCreateComponent } from './instructor.create.component';

describe('InstructorCreateComponent', () => {
  let component: InstructorCreateComponent;
  let fixture: ComponentFixture<InstructorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
