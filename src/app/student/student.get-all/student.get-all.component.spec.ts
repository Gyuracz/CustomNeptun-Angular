import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGetAllComponent } from './student.get-all.component';

describe('StudentGetAllComponent', () => {
  let component: StudentGetAllComponent;
  let fixture: ComponentFixture<StudentGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGetAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
