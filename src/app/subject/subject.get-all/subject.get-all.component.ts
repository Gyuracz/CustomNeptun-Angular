import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { Roles } from 'src/app/login/roles.enum';
import { TablerOrderPipe } from 'src/app/tabler-order.pipe';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject.model';

@Component({
  selector: 'app-subject.get-all',
  templateUrl: './subject.get-all.component.html',
  styleUrls: ['./subject.get-all.component.less']
})
export class SubjectGetAllComponent {

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
