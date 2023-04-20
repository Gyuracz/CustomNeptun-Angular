import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SemesterService } from '../semester.service';
import { Subject } from 'src/app/subject/subject.model';
import { SubjectService } from 'src/app/subject/subject.service';
import { Semester } from '../semester.model';

@Component({
  selector: 'app-semester.get-by-id',
  templateUrl: './semester.get-by-id.component.html',
  styleUrls: ['./semester.get-by-id.component.less']
})
export class SemesterGetByIdComponent implements OnInit {

  semester: any = {};

  constructor(private activatedRoute: ActivatedRoute, private semesterService: SemesterService, private subjectService: SubjectService){}

  ngOnInit(): void {
      this.getSemesters();
  }

  getSemesters(){
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.semesterService.getSemesterById(id).subscribe(data => {
      this.getSubjectOfSemesters(data);
      this.semester = data;
    });
  }

  getSubjectOfSemesters(data: Semester){
    this.subjectService.getSubjects().subscribe(subjects => {
      for(var subjectId of data.subjectIds){
        for(var it of subjects){
          if(subjectId === it.id){
            data.subjectNames.push(it.name);
          }
        }
      }
    });
  }

  onDeleteSubjectFromSemester(subjectName: string){
    let nameIdx = this.semester.subjectNames.indexOf(subjectName, 0);
    if(nameIdx !== -1){
      this.semester.subjectIds.splice(nameIdx, 1);
      this.semester.subjectNames = [];
    }
    this.semesterService.updateSemester(this.semester).subscribe();
    this.getSubjectOfSemesters(this.semester);
  }

}
