import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { InstructorService } from '../instructor.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/subject/subject.service';
import { Subject } from 'src/app/subject/subject.model';
import { SemesterService } from 'src/app/semester/semester.service';
import { Semester } from 'src/app/semester/semester.model';
import { Instructor } from '../instructor.model';

@Component({
  selector: 'app-instructor.get-by-id',
  templateUrl: './instructor.get-by-id.component.html',
  styleUrls: ['./instructor.get-by-id.component.less']
})
export class InstructorGetByIdComponent implements OnInit {

  instructor: any = {};
  semesters: Array<Semester> = [];
  subjectOfSemesters: Map<Semester, Array<Subject>> = new Map<Semester, Array<Subject>>();

  constructor(private activatedRoute: ActivatedRoute, private instructorService: InstructorService, private subjectService: SubjectService, private semesterService: SemesterService){}

  ngOnInit(): void {
      this.getInstructorById();
  }

  getInstructorById(){
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.instructorService.getInstructorById(id).subscribe(data => {
      this.getSubjectsOfSemester(data);
      this.instructor = data;
    });
  }

  getSubjectsOfSemester(data: Instructor){
    this.subjectOfSemesters = new Map<Semester, Array<Subject>>();
    this.semesterService.getSemesters().subscribe(semesters => {
      this.semesters = semesters;
      this.semesters.forEach(semester => {
        var subjects: Array<Subject> = [];
        data.subjectIds.forEach(subjectId => {
          this.subjectService.getSubjectById(subjectId).subscribe(subject => {
            data.subjectNames.push(subject.name);
            if(semester.subjectIds.includes(subject.id)){
              subjects.push(subject);
            }
          });
        });
        this.subjectOfSemesters.set(semester, subjects);
      });
    });
  }

  onDeleteSubjectFromInstructor(subject: Subject){
    let idIdx = this.instructor.subjectIds.indexOf(subject.id, 0);
    if(idIdx !== -1){
      this.instructor.subjectIds.splice(idIdx, 1);
      this.instructor.subjectNames = [];
    }
    this.instructorService.updateInstructor(this.instructor).subscribe();
    this.getSubjectsOfSemester(this.instructor);
  }
}
