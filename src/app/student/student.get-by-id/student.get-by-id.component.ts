import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Semester } from 'src/app/semester/semester.model';
import { Subject } from 'src/app/subject/subject.model';
import { StudentService } from '../student.service';
import { SemesterService } from 'src/app/semester/semester.service';
import { SubjectService } from 'src/app/subject/subject.service';
import { Student } from '../student.model';
import { Roles } from 'src/app/login/roles.enum';
import { UserService } from 'src/app/login/user.service';

@Component({
  selector: 'app-student.get-by-id',
  templateUrl: './student.get-by-id.component.html',
  styleUrls: ['./student.get-by-id.component.less']
})
export class StudentGetByIdComponent implements OnInit {

  student: any = {};
  semesters: Array<Semester> = [];
  subjectOfSemesters: Map<Semester, Array<Subject>> = new Map<Semester, Array<Subject>>();

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private studentService: StudentService, private semesterService: SemesterService, private subjectService: SubjectService){}

  ngOnInit(): void {
      this.getStudents();
  }

  getStudents(){
    let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    // this.studentService.getStudentById(id).subscribe(data => {
    //   this.getSubjectsOfSemester(data);
    //   this.student = data;
    // });
    this.userService.getUserById(id).subscribe(data => {
      if(data.roles.includes(Roles.STUDENT)){
        this.getSubjectsOfSemester(data);
        this.student = data
      }
    });
  }

  getSubjectsOfSemester(data: Student){
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

  onDeleteSubjectFromStudent(subject: Subject){
    let idIdx = this.student.subjectIds.indexOf(subject.id, 0);
    if(idIdx !== -1){
      this.student.subjectIds.splice(idIdx, 1);
      this.student.subjectNames = [];
    }
    // this.studentService.updateStudent(this.student).subscribe();
    this.userService.updateUser(this.student).subscribe();
    this.getSubjectsOfSemester(this.student);
  }

}
