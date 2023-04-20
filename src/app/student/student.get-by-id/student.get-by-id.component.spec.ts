import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGetByIdComponent } from './student.get-by-id.component';

describe('StudentGetByIdComponent', () => {
  let component: StudentGetByIdComponent;
  let fixture: ComponentFixture<StudentGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGetByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
