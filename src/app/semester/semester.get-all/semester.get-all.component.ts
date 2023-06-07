import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { Roles } from 'src/app/login/roles.enum';
import { Subject } from 'src/app/subject/subject.model';
import { SubjectService } from 'src/app/subject/subject.service';
import { TablerOrderPipe } from 'src/app/tabler-order.pipe';
import { Semester } from '../semester.model';
import { SemesterService } from '../semester.service';

@Component({
  selector: 'app-semester.get-all',
  templateUrl: './semester.get-all.component.html',
  styleUrls: ['./semester.get-all.component.less']
})
export class SemesterGetAllComponent {

  semesters: Array<Semester> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };
  isAdmin = false;

  constructor(private semesterService: SemesterService, private subjectService: SubjectService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(){
    this.authService.userInfo.subscribe((res: any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.isAdmin = true;
      }
    });
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
    if(this.isAdmin == true){
      this.semesterService.deleteSemesterById(semester.id).subscribe();
      this.getSemester();
    }
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
