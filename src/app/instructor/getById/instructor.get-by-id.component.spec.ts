import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorGetByIdComponent } from './instructor.get-by-id.component';

describe('InstructorGetByIdComponent', () => {
  let component: InstructorGetByIdComponent;
  let fixture: ComponentFixture<InstructorGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorGetByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
