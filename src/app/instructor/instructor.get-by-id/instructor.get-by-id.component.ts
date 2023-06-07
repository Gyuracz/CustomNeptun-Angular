import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { InstructorService } from '../instructor.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/subject/subject.service';
import { Subject } from 'src/app/subject/subject.model';
import { SemesterService } from 'src/app/semester/semester.service';
import { Semester } from 'src/app/semester/semester.model';
import { Instructor } from '../instructor.model';
import { UserService } from 'src/app/login/user.service';
import { Roles } from 'src/app/login/roles.enum';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-instructor.get-by-id',
  templateUrl: './instructor.get-by-id.component.html',
  styleUrls: ['./instructor.get-by-id.component.less']
})
export class InstructorGetByIdComponent implements OnInit {

  instructor: any = {};
  semesters: Array<Semester> = [];
  subjectOfSemesters: Map<Semester, Array<Subject>> = new Map<Semester, Array<Subject>>();
  isAdmin = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private subjectService: SubjectService, private semesterService: SemesterService, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.userInfo.subscribe((res: any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.isAdmin = true;
      }
    });
    this.getInstructorById();
  }

  getInstructorById(){
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userService.getUserById(id).subscribe(data => {
      if(data.roles.includes(Roles.INSTRUCTOR)){
        this.getSubjectsOfSemester(data);
        this.instructor = data
      }
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
    if(this.isAdmin == true){
      let idIdx = this.instructor.subjectIds.indexOf(subject.id, 0);
      if(idIdx !== -1){
        this.instructor.subjectIds.splice(idIdx, 1);
        this.instructor.subjectNames = [];
      }   
      this.userService.updateUser(this.instructor).subscribe();
      this.getSubjectsOfSemester(this.instructor);
    }
  }
}
