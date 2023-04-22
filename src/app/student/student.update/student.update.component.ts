import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/subject/subject.model';
import { SubjectService } from 'src/app/subject/subject.service';
import { Department } from '../department.enum';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student.update',
  templateUrl: './student.update.component.html',
  styleUrls: ['./student.update.component.less']
})
export class StudentUpdateComponent implements OnInit {

  studentForm!: FormGroup;
  subjects: Array<Subject> = [];
  departments: Array<string> = [];
  formArray: FormArray = this.formBuilder.array([]);
  student: any = {};
  selectedSubjects: Map<Subject, boolean> = new Map<Subject, boolean>;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService , private subjectService: SubjectService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    Object.values(Department).forEach((key, idx) => {
      this.departments.push(key);
    });
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.studentForm = this.formBuilder.group(
      {
        "id": "",
        "neptun": ["", { validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[a-zA-z](?=.*[a-zA-Z0-9]).{5,}$")], updateOn: "change" }],
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "email": ["", { validators: [Validators.required, Validators.email], updateOn: "change" }],
        "department": ["", { validators: [Validators.required], updateOn: "change" }],
        "subjectIds": this.formArray,
        "subjectNames": this.formBuilder.array([])
      }
    );
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.studentService.getStudentById(id).subscribe(data => {
      this.student = data;
      this.subjects.forEach(subject => {
        if(this.student.subjectIds.includes(subject.id)){
          this.selectedSubjects.set(subject, true);
        }else{
          this.selectedSubjects.set(subject, false);
        }
      });
      for(let it in this.student.subjectIds){
        this.formArray.push(new FormControl(it));
      }
      this.studentForm.patchValue({
        "id": this.student.id,
        "neptun": this.student.neptun,
        "name": this.student.name,
        "email": this.student.email,
        "department": this.student.department,
        "subjectIds": this.student.subjectIds,
        "subjectNames": this.student.subjectNames
      });
    });
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
      if (this.neptun?.hasError('maxlength')) return 'You can enter exactly 6 characters!';
      if (this.neptun?.hasError('minlength')) return 'You can enter exactly 6 characters!';
      if (this.neptun?.hasError('pattern')) return 'It have not to start with a number!';
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
