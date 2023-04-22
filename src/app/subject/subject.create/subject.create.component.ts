import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../subject.service';
import { Router } from '@angular/router';
import { Subject } from '../subject.model';
import { Department } from '../department.enum';

@Component({
  selector: 'app-subject.create',
  templateUrl: './subject.create.component.html',
  styleUrls: ['./subject.create.component.less']
})
export class SubjectCreateComponent implements OnInit {

  subjectForm!: FormGroup;
  departments: Array<string> = [];

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService, private router: Router){}

  ngOnInit(): void {
    Object.values(Department).forEach((key, idx) => {
      this.departments.push(key);
    });
    this.subjectForm = this.formBuilder.group(
      {
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "code": ["", { validators: [Validators.required, Validators.maxLength(30)], updateOn: "change" }],
        "credit": ["", { validators: [Validators.required, Validators.maxLength(2)], updateOn: "change" }],
        "department": [Department.VIRT, { validators: [Validators.required] }]
      }
    );
  }

  onSubmit(subject: Subject){
    this.subjectService.createSubject(subject).subscribe(res => {
      this.subjectForm.reset();
      this.router.navigate(["/subjects"]);
    });
  }

  get name(){
    return this.subjectForm.get("name");
  }

  get code(){
    return this.subjectForm.get("code");
  }

  get credit(){
    return this.subjectForm.get("credit");
  }

  get department(){
    return this.subjectForm.get("department");
  }

  getNameErrorMessage(){
    if (this.name?.dirty || this.name?.touched) {
      if (this.name?.hasError('required')) return 'You must enter a value!';
      if (this.name?.hasError('maxlength')) return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getCodeErrorMessage(){
    if (this.code?.dirty || this.code?.touched) {
      if (this.code?.hasError('required')) return 'You must enter a value!';
      if (this.code?.hasError('maxlength')) return 'You can enter at most 30 characters!';
    }
    return '';
  }

  getCreditErrorMessage(){
    if (this.credit?.dirty || this.credit?.touched) {
      if (this.credit?.hasError('required')) return 'You must enter a value!';
      if (this.credit?.hasError('maxlength')) return 'You can enter at most 2 characters!';
    }
    return '';
  }

  getDepartmentErrorMessage(){
    if (this.department?.dirty || this.department?.touched) {
      if (this.department?.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

}
