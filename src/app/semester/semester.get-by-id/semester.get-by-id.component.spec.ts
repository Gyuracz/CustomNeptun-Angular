import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterGetByIdComponent } from './semester.get-by-id.component';

describe('SemesterGetByIdComponent', () => {
  let component: SemesterGetByIdComponent;
  let fixture: ComponentFixture<SemesterGetByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterGetByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterGetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
