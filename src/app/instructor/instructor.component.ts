import { Component, OnInit } from '@angular/core';
import { InstructorService } from './instructor.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Instructor } from './instructor.model';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.model';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.less']
})
export class InstructorComponent implements OnInit {

  instructors: Array<Instructor> = [];
  subjects: Array<Subject> = [];

  constructor(private instructorService: InstructorService, private subjectService: SubjectService){}

  ngOnInit(){
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
              console.log(it.name);
            }
          }
        }
      }
      this.instructors = data;
    });
  }

  onDeleteInstructor(instructor: Instructor){
    this.instructorService.deleteInstructorById(instructor.id).subscribe(res => {
      console.log(res);
    });
    this.getInstructors();
  }

}
