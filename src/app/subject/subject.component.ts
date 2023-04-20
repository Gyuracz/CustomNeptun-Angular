import { Component, OnInit } from '@angular/core';
import { SubjectService } from './subject.service';
import { Subject } from './subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.less']
})
export class SubjectComponent implements OnInit {

  subjects: Array<Subject> = [];

  constructor(private subjectService: SubjectService){}

  ngOnInit(): void {
      this.getSubjects();
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  onDeleteSubject(subject: Subject){
    this.subjectService.deleteSubjectById(subject.id).subscribe(res => {
      console.log(res);
    });
    this.getSubjects();
  }

}
