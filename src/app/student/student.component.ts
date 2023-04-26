import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { SubjectService } from '../subject/subject.service';
import { Student } from './student.model';
import { Subject } from '../subject/subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablerOrderPipe } from '../tabler-order.pipe';
import { UserService } from '../login/user.service';
import { Roles } from '../login/roles.enum';
import { User } from '../login/user.model';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent implements OnInit {

  students: Array<User> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };

  constructor(private userService: UserService, private studentService: StudentService, private subjectService: SubjectService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      "neptun": "",
      "name": "",
      "email": "",
      "department": ""
    });
    this.getStudents();
  }

  getStudents(){
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    // this.studentService.getStudents().subscribe(data => {
    //   for(var student of data){
    //     for(var subjectId of student.subjectIds){
    //       for(var it of this.subjects){
    //         if(subjectId === it.id){
    //           student.subjectNames.push(it.name);
    //         }
    //       }
    //     }
    //   }
    //   this.students = data;
    // });
    this.userService.getUsers().subscribe(data => {
      for(var user of data){
        if(user.roles.includes(Roles.STUDENT)){
          for(var subjectId of user.subjectIds){
            for(var it of this.subjects){
              if(subjectId === it.id){
                user.subjectNames.push(it.name);
              }
            }
          }
          this.students.push(user);
        }
      }
    });
  }

  onDeleteStudent(student: User){
    // this.studentService.deleteStudentById(student.id).subscribe();
    this.authService.userInfo.subscribe((res:any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.userService.deleteUserById(student.id).subscribe();
        this.students = [];
        this.getStudents();
      }
    });
  }

  changeSorting(column: string, direction: string){
    if(this.sort.column == column && this.sort.direction == direction){
      this.sort.column = "";
      this.sort.direction = "";
      this.students = [];
      this.getStudents();
    }else{
      this.sort.column = column;
      this.sort.direction = direction;
      this.students = new TablerOrderPipe().transform(this.students, this.sort);
    }
  }

}
