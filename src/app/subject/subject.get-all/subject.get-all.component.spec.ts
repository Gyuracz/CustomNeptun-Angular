import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectGetAllComponent } from './subject.get-all.component';

describe('SubjectGetAllComponent', () => {
  let component: SubjectGetAllComponent;
  let fixture: ComponentFixture<SubjectGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectGetAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
