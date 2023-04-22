import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/subject/subject.model';
import { StudentService } from '../student.service';
import { SubjectService } from 'src/app/subject/subject.service';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { Department } from '../department.enum';

@Component({
  selector: 'app-student.create',
  templateUrl: './student.create.component.html',
  styleUrls: ['./student.create.component.less']
})
export class StudentCreateComponent implements OnInit {

  studentForm!: FormGroup;
  subjects: Array<Subject> = [];
  departments: Array<string> = [];
  formArray: FormArray = this.formBuilder.array([]);

  constructor(private formBuilder: FormBuilder, private studentService: StudentService , private subjectService: SubjectService, private router: Router){}

  ngOnInit(): void {
    Object.values(Department).forEach((key, idx) => {
      this.departments.push(key);
    });
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.studentForm = this.formBuilder.group(
      {
        "neptun": ["", { validators: [Validators.required, Validators.maxLength(6)], updateOn: "change" }],
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "email": ["", { validators: [Validators.required, Validators.email], updateOn: "change" }],
        "department": [Department.MERNOKINFORMATIKUSBSC, { validators: [Validators.required], updateOn: "change" }],
        "subjectIds": this.formBuilder.array([]),
        "subjectNames": this.formBuilder.array([])
      }
    );
  }

  onSubmit(student: Student){
    this.studentService.createStudent(student).subscribe(res => {
      this.studentForm.reset();
      this.router.navigate(["/students"]);
    });
  }
  
  get neptun(){
    return this.studentForm.get("neptun");
  }

  get name(){
    return this.studentForm.get("name");
  }
  
  get email(){
    return this.studentForm.get("email");
  }

  getNeptunErrorMessage(){
    if (this.neptun?.dirty || this.neptun?.touched) {
      if (this.neptun?.hasError('required')) return 'You must enter a value!';
      if (this.neptun?.hasError('maxlength')) return 'You can enter at most 6 characters!';
    }
    return '';
  }

  getNameErrorMessage(){
    if (this.name?.dirty || this.name?.touched) {
      if (this.name?.hasError('required')) return 'You must enter a value!';
      if (this.name?.hasError('maxlength')) return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getEmailErrorMessage(){
    if (this.email?.dirty || this.email?.touched) {
      if (this.email?.hasError('required')) return 'You must enter a value!';
      if (this.email?.hasError('email')) return 'It is not a valid form of an email!';
    }
    return '';
  }

  onCheckChange($event: any) {
    this.formArray = this.studentForm.get('subjectIds') as FormArray;
    /* Selectedneptun */
    if($event.source.checked){
      // Add a new control in the arrayForm
      this.subjects.forEach(subject => {
        if(subject.name === $event.source.value){
          this.formArray.push(new FormControl(subject.id));
        }
      });
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
      this.formArray.controls.forEach(ctrl => {
        if(ctrl.value == $event.source.value) {
          // Remove the unselected element from the arrayForm
          this.formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
