import { Component, OnInit } from '@angular/core';
import { InstructorService } from './instructor.service';
import { Instructor } from './instructor.model';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.less']
})
export class InstructorComponent implements OnInit {

  instructors: Array<Instructor> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;

  constructor(private instructorService: InstructorService, private subjectService: SubjectService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.filterForm = this.formBuilder.group({
      "neptun": "",
      "name": "",
      "email": "",
      "post": ""
    });
    this.getInstructors();
  }

  getInstructors(){
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.instructorService.getInstructors().subscribe(data => {
      for(var instructor of data){
        for(var subjectId of instructor.subjectIds){
          for(var it of this.subjects){
            if(subjectId === it.id){
              instructor.subjectNames.push(it.name);
            }
          }
        }
      }
      this.instructors = data;
    });
  }

  onDeleteInstructor(instructor: Instructor){
    this.instructorService.deleteInstructorById(instructor.id).subscribe();
    this.getInstructors();
  }

}
