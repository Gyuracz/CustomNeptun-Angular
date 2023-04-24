import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/subject/subject.model';
import { StudentService } from '../student.service';
import { SubjectService } from 'src/app/subject/subject.service';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { Department } from '../department.enum';
import { Roles } from 'src/app/login/roles.enum';
import { User } from 'src/app/login/user.model';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-student.create',
  templateUrl: './student.create.component.html',
  styleUrls: ['./student.create.component.less']
})
export class StudentCreateComponent implements OnInit {

  studentForm!: FormGroup;
  subjects: Array<Subject> = [];
  departments: Array<string> = [];
  subjectArray: FormArray = this.formBuilder.array([]);
  rolesArray: FormArray = this.formBuilder.array([]);
  ADMIN = Roles.ADMIN;
  STUDENT = Roles.STUDENT;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private studentService: StudentService , private subjectService: SubjectService, private router: Router){}

  ngOnInit(): void {
    Object.values(Department).forEach((key, idx) => {
      this.departments.push(key);
    });
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.studentForm = this.formBuilder.group(
      {
        "neptun": ["", { validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[a-zA-z](?=.*[a-zA-Z0-9]).{5,}$")], updateOn: "change" }],
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "email": ["", { validators: [Validators.required, Validators.email], updateOn: "change" }],
        "birth": ["", { validators: [Validators.required], updateOn: "change" }],
        "departmentOfInstructor": "",
        "postOfInstructor": "",
        "departmentOfStudent": [Department.MERNOKINFORMATIKUSBSC, { validators: [Validators.required], updateOn: "change" }],
        "subjectIds": this.subjectArray,
        "subjectNames": this.formBuilder.array([]),
        "roles": this.rolesArray,
        "password": ["", { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" }],
      }
    );
  }

  onSubmit(student: User){
    // this.studentService.createStudent(student).subscribe(res => {
    //   this.studentForm.reset();
    //   this.router.navigate(["/students"]);
    // });
    student.roles.push(Roles.STUDENT);
    this.userService.createUser(student).subscribe(res => {
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

  get birth(){
    return this.studentForm.get("birth");
  }

  get department(){
    return this.studentForm.get("departmentOfStudent");
  }

  get password(){
    return this.studentForm.get("password");
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

  getBirthErrorMessage(){
    if (this.email?.dirty || this.email?.touched) {
      if (this.email?.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

  getDepartmentErrorMessage(){
    if (this.email?.dirty || this.email?.touched) {
      if (this.email?.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

  getPostErrorMessage(){
    if (this.email?.dirty || this.email?.touched) {
      if (this.email?.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

  getPasswordErrorMessage(){
    if (this.email?.dirty || this.email?.touched) {
      if (this.email?.hasError('required')) return 'You must enter a value!';
      if (this.email?.hasError('minlength')) return 'You must choose minimum 6 characters!';
    }
    return '';
  }

  onCheckChangeSubjects($event: any) {
    this.subjectArray = this.studentForm.get('subjectIds') as FormArray;
    /* Selected */
    if($event.source.checked){
      // Add a new control in the arrayForm
      this.subjects.forEach(subject => {
        if(subject.name === $event.source.value){
          this.subjectArray.push(new FormControl(subject.id));
        }
      });
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
      this.subjectArray.controls.forEach(ctrl => {
        if(ctrl.value == $event.source.value) {
          // Remove the unselected element from the arrayForm
          this.subjectArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCheckChangeRoles($event: any){
    this.rolesArray = this.studentForm.get('roles') as FormArray;
    /* Selected */
    if($event.source.checked){
      // Add a new control in the arrayForm
      if($event.source.value == Roles.ADMIN){
        this.rolesArray.push(new FormControl(Roles.ADMIN));
      }
      if($event.source.value == Roles.STUDENT){
        this.rolesArray.push(new FormControl(Roles.STUDENT));
      }
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
      this.rolesArray.controls.forEach(ctrl => {
        if(ctrl.value == $event.source.value) {
          // Remove the unselected element from the arrayForm
          this.rolesArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
