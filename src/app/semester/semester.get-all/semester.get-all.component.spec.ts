import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterGetAllComponent } from './semester.get-all.component';

describe('SemesterGetAllComponent', () => {
  let component: SemesterGetAllComponent;
  let fixture: ComponentFixture<SemesterGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterGetAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
