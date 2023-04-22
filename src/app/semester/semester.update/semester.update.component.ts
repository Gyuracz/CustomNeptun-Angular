import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/subject/subject.model';
import { SemesterService } from '../semester.service';
import { SubjectService } from 'src/app/subject/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Semester } from '../semester.model';

@Component({
  selector: 'app-semester.update',
  templateUrl: './semester.update.component.html',
  styleUrls: ['./semester.update.component.less']
})
export class SemesterUpdateComponent implements OnInit {

  semesterForm!: FormGroup;
  subjects: Array<Subject> = [];
  formArray: FormArray = this.formBuilder.array([]);
  semester: any = {};
  selectedSubjects: Map<Subject, boolean> = new Map<Subject, boolean>;

  constructor(private formBuilder: FormBuilder, private semesterService: SemesterService , private subjectService: SubjectService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.semesterForm = this.formBuilder.group(
      {
        "id": "",
        "name": ["", { validators: [Validators.required, Validators.maxLength(50)], updateOn: "change" }],
        "start": ["", { validators: [Validators.required, Validators.maxLength(10)], updateOn: "change" }],
        "end": ["", { validators: [Validators.required, Validators.maxLength(10)], updateOn: "change" }],
        "subjectIds": this.formArray,
        "subjectNames": this.formBuilder.array([])
      }
    );
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.semesterService.getSemesterById(id).subscribe(data => {
      this.semester = data;
      this.subjects.forEach(subject => {
        if(this.semester.subjectIds.includes(subject.id)){
          this.selectedSubjects.set(subject, true);
        }else{
          this.selectedSubjects.set(subject, false);
        }
      });
      for(let it in this.semester.subjectIds){
        this.formArray.push(new FormControl(it));
      }
      this.semesterForm.patchValue({
        "id": this.semester.id,
        "name": this.semester.name,
        "start": this.semester.start,
        "end": this.semester.end,
        "subjectIds": this.semester.subjectIds,
        "subjectNames": this.semester.subjectNames
      });
    });
  }

  onSubmit(semester: Semester){
    this.semesterService.updateSemester(semester).subscribe(res => {
      this.semesterForm.reset();
      this.router.navigate(["/semesters"]);
    });
  }

  get name(){
    return this.semesterForm.get("name");
  }

  get start(){
    return this.semesterForm.get("start");
  }

  get end(){
    return this.semesterForm.get("end");
  }

  getNameErrorMessage(){
    if (this.name?.dirty || this.name?.touched) {
      if (this.name?.hasError('required')) return 'You must enter a value!';
      if (this.name?.hasError('maxlength')) return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getStartErrorMessage(){
    if (this.start?.dirty || this.start?.touched) {
      if (this.start?.hasError('required')) return 'You must enter a value!';
      if (this.start?.hasError('maxlength')) return 'You can enter at most 10 characters!';
    }
    return '';
  }

  getEndErrorMessage(){
    if (this.end?.dirty || this.end?.touched) {
      if (this.end?.hasError('required')) return 'You must enter a value!';
      if (this.end?.hasError('maxlength')) return 'You can enter at most 10 characters!';
    }
    return '';
  }

  onCheckChange($event: any) {
    this.formArray = this.semesterForm.get('subjectIds') as FormArray;
    /* Selected */
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
