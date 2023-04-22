import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department.enum';
import { Subject } from '../subject.model';

@Component({
  selector: 'app-subject.update',
  templateUrl: './subject.update.component.html',
  styleUrls: ['./subject.update.component.less']
})
export class SubjectUpdateComponent implements OnInit {

  subjectForm!: FormGroup;
  departments: Array<string> = [];
  subject: any = {};

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    Object.values(Department).forEach((key, idx) => {
      this.departments.push(key);
    });
    this.subjectForm = this.formBuilder.group(
      {
        "id": "",
        "name": ["", { validators: [Validators.required, Validators.maxLength(80)], updateOn: "change" }],
        "code": ["", { validators: [Validators.required, Validators.maxLength(30)], updateOn: "change" }],
        "credit": ["", { validators: [Validators.required, Validators.maxLength(2)], updateOn: "change" }],
        "department": ["", { validators: [Validators.required] }]
      }
    );
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.subjectService.getSubjectById(id).subscribe(data => {
      this.subject = data;
      this.subjectForm.patchValue({
        "id": this.subject.id,
        "name": this.subject.name,
        "code": this.subject.code,
        "credit": this.subject.credit,
        "department": this.subject.department
      });
    });
  }

  onSubmit(subject: Subject){
    this.subjectService.updateSubject(subject).subscribe(res => {
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
      if (this.name?.hasError('maxlength')) return 'You can enter at most 80 characters!';
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
