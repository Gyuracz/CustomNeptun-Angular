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

}
