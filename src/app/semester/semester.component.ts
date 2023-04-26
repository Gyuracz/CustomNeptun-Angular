import { Component, OnInit } from '@angular/core';
import { Semester } from './semester.model';
import { SemesterService } from './semester.service';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablerOrderPipe } from '../tabler-order.pipe';
import { AuthService } from '../login/auth.service';
import { Roles } from '../login/roles.enum';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.less']
})
export class SemesterComponent implements OnInit {

  semesters: Array<Semester> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };

  constructor(private semesterService: SemesterService, private subjectService: SubjectService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(){
    this.filterForm = this.formBuilder.group({
      "name": "",
      "start": "",
      "end": ""
    });
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
    this.authService.userInfo.subscribe((res:any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.semesterService.deleteSemesterById(semester.id).subscribe();
        this.getSemester();
      }
    });
  }

  changeSorting(column: string, direction: string){
    if(this.sort.column == column && this.sort.direction == direction){
      this.sort.column = "";
      this.sort.direction = "";
      this.getSemester();
    }else{
      this.sort.column = column;
      this.sort.direction = direction;
      this.semesters = new TablerOrderPipe().transform(this.semesters, this.sort);
    }
  }
  
}
