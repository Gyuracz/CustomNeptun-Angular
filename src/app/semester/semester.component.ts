import { Component, OnInit } from '@angular/core';
import { Semester } from './semester.model';
import { SemesterService } from './semester.service';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.model';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.less']
})
export class SemesterComponent implements OnInit {

  semesters: Array<Semester> = [];
  subjects: Array<Subject> = [];

  constructor(private semesterService: SemesterService, private subjectService: SubjectService){}

  ngOnInit(){
    this.getSemester();
  }

  getSemester(){
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.semesterService.getSemesters().subscribe(data => {
      for(var semester of data){
        for(var subjectId of semester.subjectIds){
          for(var it of this.subjects){
            if(subjectId === it.id){
              semester.subjectNames.push(it.name);
            }
          }
        }
      }
      this.semesters = data;
    });
  }

  onDeleteSemester(semester: Semester){
    this.semesterService.deleteSemesterById(semester.id).subscribe();
    this.getSemester();
  }
  
}
