import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { Roles } from 'src/app/login/roles.enum';
import { User } from 'src/app/login/user.model';
import { UserService } from 'src/app/login/user.service';
import { Subject } from 'src/app/subject/subject.model';
import { SubjectService } from 'src/app/subject/subject.service';
import { TablerOrderPipe } from 'src/app/tabler-order.pipe';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student.get-all',
  templateUrl: './student.get-all.component.html',
  styleUrls: ['./student.get-all.component.less']
})
export class StudentGetAllComponent {

  students: Array<User> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };
  isAdmin = false;

  constructor(private userService: UserService, private subjectService: SubjectService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.userInfo.subscribe((res: any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.isAdmin = true;
      }
    });
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
    if(this.isAdmin){
      this.userService.deleteUserById(student.id).subscribe();
      this.students = [];
      this.getStudents();
    }
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
