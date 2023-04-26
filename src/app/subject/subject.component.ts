import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { Subject } from './subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablerOrderPipe } from '../tabler-order.pipe';
import { AuthService } from '../login/auth.service';
import { Roles } from '../login/roles.enum';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.less']
})
export class SubjectComponent implements OnInit {

  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };

  constructor(private subjectService: SubjectService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
      this.filterForm = this.formBuilder.group({
        "name": "",
        "code": "",
        "credit": "",
        "department": ""
      });
      this.getSubjects();
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  onDeleteSubject(subject: Subject){
    this.authService.userInfo.subscribe((res:any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.subjectService.deleteSubjectById(subject.id).subscribe();
        this.getSubjects();
      }
    });
  }

  changeSorting(column: string, direction: string){
    if(this.sort.column == column && this.sort.direction == direction){
      this.sort.column = "";
      this.sort.direction = "";
      this.getSubjects();
    }else{
      this.sort.column = column;
      this.sort.direction = direction;
      this.subjects = new TablerOrderPipe().transform(this.subjects, this.sort);
    }
  }

}
