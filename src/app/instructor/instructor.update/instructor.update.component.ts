import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/subject/subject.model';
import { Post } from '../post.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/subject/subject.service';
import { Instructor } from '../instructor.model';
import { InstructorService } from '../instructor.service';

@Component({
  selector: 'app-instructor.update',
  templateUrl: './instructor.update.component.html',
  styleUrls: ['./instructor.update.component.less']
})
export class InstructorUpdateComponent implements OnInit {

  instructorForm!: FormGroup;
  subjects: Array<Subject> = [];
  posts: Array<string> = [];
  formArray: FormArray = this.formBuilder.array([]);
  instructor: any = {};
  selectedSubjects: Map<Subject, boolean> = new Map<Subject, boolean>;

  constructor(private formBuilder: FormBuilder, private instructorService: InstructorService , private subjectService: SubjectService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    Object.values(Post).forEach((key, idx) => {
      this.posts.push(key);
    });
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.instructorForm = this.formBuilder.group(
      {
        "id": "",
        "neptun": ["", { validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[a-zA-z](?=.*[a-zA-Z0-9]).{5,}$")], updateOn: "change" }],
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "email": ["", { validators: [Validators.required, Validators.email], updateOn: "change" }],
        "post": ["", { validators: [Validators.required], updateOn: "change" }],
        "subjectIds": this.formArray,
        "subjectNames": this.formBuilder.array([])
      }
    );
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.instructorService.getInstructorById(id).subscribe(data => {
      this.instructor = data;
      this.subjects.forEach(subject => {
        if(this.instructor.subjectIds.includes(subject.id)){
          this.selectedSubjects.set(subject, true);
        }else{
          this.selectedSubjects.set(subject, false);
        }
      });
      for(let it in this.instructor.subjectIds){
        this.formArray.push(new FormControl(it));
      }
      this.instructorForm.patchValue({
        "id": this.instructor.id,
        "neptun": this.instructor.neptun,
        "name": this.instructor.name,
        "email": this.instructor.email,
        "post": this.instructor.post,
        "subjectIds": this.instructor.subjectIds,
        "subjectNames": this.instructor.subjectNames
      });
    });
  }

  onSubmit(instructor: Instructor){
    this.instructorService.createInstructor(instructor).subscribe(res => {
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
    this.formArray = this.instructorForm.get('subjectIds') as FormArray;
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
