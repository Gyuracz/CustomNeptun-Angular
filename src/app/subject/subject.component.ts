import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { Subject } from './subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.less']
})
export class SubjectComponent implements OnInit {

  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  sort = {
    column: "",
    direction: ""
  };

  constructor(private subjectService: SubjectService, private formBuilder: FormBuilder){}

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
    this.subjectService.deleteSubjectById(subject.id).subscribe();
    this.getSubjects();
  }

  changeSorting(column: string, direction: string){
    if(this.sort.column == column && this.sort.direction == direction){
      this.sort.column = "";
      this.sort.direction = "";
      this.getSubjects();
    }else{
      this.sort.column = column;
      this.sort.direction = direction;
      this.subjects = this.orderTable(this.subjects, this.sort);
    }
  }

  orderTable(value: any, sort: any){
    return value.sort((v1: { [x: string]: number; }, v2: { [x: string]: number; }) => {
      if(v1[sort.column] > v2[sort.column]){
        if(sort.direction == "asc"){
          return 1;
        }
        if(sort.direction == "desc"){
          return -1;
        }
      }
      if(v1[sort.column] < v2[sort.column]){
        if(sort.direction == "asc"){
          return -1;
        }
        if(sort.direction == "desc"){
          return 1;
        }
      }
      return 0;
    });
  }

}
