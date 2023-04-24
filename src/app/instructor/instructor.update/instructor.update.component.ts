import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/subject/subject.model';
import { Post } from '../post.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/subject/subject.service';
import { Instructor } from '../instructor.model';
import { InstructorService } from '../instructor.service';
import { Roles } from 'src/app/login/roles.enum';
import { Department } from 'src/app/subject/department.enum';
import { UserService } from 'src/app/login/user.service';
import { User } from 'src/app/login/user.model';

@Component({
  selector: 'app-instructor.update',
  templateUrl: './instructor.update.component.html',
  styleUrls: ['./instructor.update.component.less']
})
export class InstructorUpdateComponent implements OnInit {

  instructorForm!: FormGroup;
  subjects: Array<Subject> = [];
  posts: Array<string> = [];
  departments: Array<string> = [];
  subjectArray: FormArray = this.formBuilder.array([]);
  instructor: any = {};
  selectedSubjects: Map<Subject, boolean> = new Map<Subject, boolean>;
  rolesArray: FormArray = this.formBuilder.array([]);
  ADMIN = Roles.ADMIN;
  INSTRUCTOR = Roles.INSTRUCTOR;
  isAdmin = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private instructorService: InstructorService , private subjectService: SubjectService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    Object.values(Post).forEach((key, idx) => {
      this.posts.push(key);
    });
    Object.values(Department).forEach((key, idx) => {
      this.departments.push(key);
    });
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.instructorForm = this.formBuilder.group(
      {
        "neptun": ["", { validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[a-zA-z](?=.*[a-zA-Z0-9]).{5,}$")], updateOn: "change" }],
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "email": ["", { validators: [Validators.required, Validators.email], updateOn: "change" }],
        "birth": ["", { validators: [Validators.required], updateOn: "change" }],
        "departmentOfInstructor": ["", { validators: [Validators.required], updateOn: "change" }],
        "postOfInstructor": ["", { validators: [Validators.required], updateOn: "change" }],
        "departmentOfStudent": "",
        "subjectIds": this.subjectArray,
        "subjectNames": this.formBuilder.array([]),
        "roles": this.rolesArray,
        "password": ["", { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" }],
      }
    );
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userService.getUserById(id).subscribe(data => {
      this.instructor = data;
      this.subjects.forEach(subject => {
        if(this.instructor.subjectIds.includes(subject.id)){
          this.selectedSubjects.set(subject, true);
        }else{
          this.selectedSubjects.set(subject, false);
        }
      });
      for(let it in this.instructor.subjectIds){
        this.subjectArray.push(new FormControl(it));
      }
      for(let it in this.instructor.roles){
        this.rolesArray.push(new FormControl(it));
      }
      if(this.instructor.roles.includes(Roles.ADMIN)){
        this.isAdmin = true;
      }
      this.instructorForm.patchValue({
        "id": this.instructor.id,
        "neptun": this.instructor.neptun,
        "name": this.instructor.name,
        "email": this.instructor.email,
        "birth": this.instructor.birth,
        "departmentOfInstructor": this.instructor.departmentOfInstructor,
        "postOfInstructor": this.instructor.postOfInstructor,
        "departmentOfStudent": this.instructor.departmentOfStudent,
        "subjectIds": this.instructor.subjectIds,
        "subjectNames": this.instructor.subjectNames,
        "roles": this.instructor.roles,
        "password": this.instructor.password
      });
    });
  }

  onSubmit(instructor: User){
    // this.instructorService.createInstructor(instructor).subscribe(res => {
    //   this.instructorForm.reset();
    //   this.router.navigate(["/instructors"]);
    // });
    instructor.id = this.instructor.id;
    this.userService.updateUser(instructor).subscribe(res => {
      this.instructorForm.reset();
      this.router.navigate(["/instructors"]);
    });
  }
  
  get neptun(){
    return this.instructorForm.get("neptun");
  }

  get name(){
    return this.instructorForm.get("name");
  }
  
  get email(){
    return this.instructorForm.get("email");
  }

  get birth(){
    return this.instructorForm.get("birth");
  }

  get department(){
    return this.instructorForm.get("departmentOfInstructor");
  }

  get post(){
    return this.instructorForm.get("postOfInstructor");
  }

  get password(){
    return this.instructorForm.get("password");
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
    this.subjectArray = this.instructorForm.get('subjectIds') as FormArray;
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
    this.rolesArray = this.instructorForm.get('roles') as FormArray;
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
