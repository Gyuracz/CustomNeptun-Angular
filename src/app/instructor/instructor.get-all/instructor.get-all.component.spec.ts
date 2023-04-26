import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorGetAllComponent } from './instructor.get-all.component';

describe('InstructorGetAllComponent', () => {
  let component: InstructorGetAllComponent;
  let fixture: ComponentFixture<InstructorGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorGetAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
