import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/subject/subject.model';
import { SubjectService } from 'src/app/subject/subject.service';
import { Department } from '../department.enum';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { Roles } from 'src/app/login/roles.enum';
import { UserService } from 'src/app/login/user.service';
import { User } from 'src/app/login/user.model';

@Component({
  selector: 'app-student.update',
  templateUrl: './student.update.component.html',
  styleUrls: ['./student.update.component.less']
})
export class StudentUpdateComponent implements OnInit {

  studentForm!: FormGroup;
  subjects: Array<Subject> = [];
  departments: Array<string> = [];
  subjectArray: FormArray = this.formBuilder.array([]);
  student: any = {};
  selectedSubjects: Map<Subject, boolean> = new Map<Subject, boolean>;
  rolesArray: FormArray = this.formBuilder.array([]);
  ADMIN = Roles.ADMIN;
  INSTRUCTOR = Roles.INSTRUCTOR;
  isAdmin = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private studentService: StudentService , private subjectService: SubjectService, private router: Router, private activatedRoute: ActivatedRoute){}

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
        "departmentOfStudent": ["", { validators: [Validators.required], updateOn: "change" }],
        "subjectIds": this.subjectArray,
        "subjectNames": this.formBuilder.array([]),
        "roles": this.rolesArray,
        "password": ["", { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" }],
      }
    );
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userService.getUserById(id).subscribe(data => {
      this.student = data;
      this.subjects.forEach(subject => {
        if(this.student.subjectIds.includes(subject.id)){
          this.selectedSubjects.set(subject, true);
        }else{
          this.selectedSubjects.set(subject, false);
        }
      });
      for(let it in this.student.subjectIds){
        this.subjectArray.push(new FormControl(it));
      }
      for(let it in this.student.roles){
        this.rolesArray.push(new FormControl(it));
      }
      if(this.student.roles.includes(Roles.ADMIN)){
        this.isAdmin = true;
      }
      this.studentForm.patchValue({
        "id": this.student.id,
        "neptun": this.student.neptun,
        "name": this.student.name,
        "email": this.student.email,
        "birth": this.student.birth,
        "departmentOfInstructor": this.student.departmentOfInstructor,
        "postOfInstructor": this.student.postOfInstructor,
        "departmentOfStudent": this.student.departmentOfStudent,
        "subjectIds": this.student.subjectIds,
        "subjectNames": this.student.subjectNames,
        "roles": this.student.roles,
        "password": this.student.password
      });
    });
  }

  onSubmit(student: User){
    // this.studentService.createStudent(student).subscribe(res => {
    //   this.studentForm.reset();
    //   this.router.navigate(["/students"]);
    // });
    student.id = this.student.id;
    this.userService.updateUser(student).subscribe(res => {
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
      if($event.source.value == Roles.INSTRUCTOR){
        this.rolesArray.push(new FormControl(Roles.INSTRUCTOR));
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
