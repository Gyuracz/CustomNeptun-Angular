import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { Roles } from 'src/app/login/roles.enum';
import { User } from 'src/app/login/user.model';
import { UserService } from 'src/app/login/user.service';
import { Subject } from 'src/app/subject/subject.model';
import { SubjectService } from 'src/app/subject/subject.service';
import { TablerOrderPipe } from 'src/app/tabler-order.pipe';
import { InstructorService } from '../instructor.service';

@Component({
  selector: 'app-instructor.get-all',
  templateUrl: './instructor.get-all.component.html',
  styleUrls: ['./instructor.get-all.component.less']
})
export class InstructorGetAllComponent {

  instructors: Array<User> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };
  isAdmin = false;

  constructor(private userService: UserService, private subjectService: SubjectService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(){
    this.authService.userInfo.subscribe((res: any) => {
      if(res.roles.includes(Roles.ADMIN)){
        this.isAdmin = true;
      }
    });
    this.filterForm = this.formBuilder.group({
      "neptun": "",
      "name": "",
      "email": "",
      "post": ""
    });
    this.getInstructors();
  }

  getInstructors(){
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
    this.userService.getUsers().subscribe(data => {
      for(var user of data){
        if(user.roles.includes(Roles.INSTRUCTOR)){
          for(var subjectId of user.subjectIds){
            for(var it of this.subjects){
              if(subjectId === it.id){
                user.subjectNames.push(it.name);
              }
            }
          }
          this.instructors.push(user);
        }
      }
    });
  }

  onDeleteInstructor(instructor: User){
    if(this.isAdmin == true){
      this.userService.deleteUserById(instructor.id).subscribe();
      this.instructors = [];
      this.getInstructors();
    }
  }

  changeSorting(column: string, direction: string){
    if(this.sort.column == column && this.sort.direction == direction){
      this.sort.column = "";
      this.sort.direction = "";
      this.instructors = [];
      this.getInstructors();
    }else{
      this.sort.column = column;
      this.sort.direction = direction;
      this.instructors = new TablerOrderPipe().transform(this.instructors, this.sort);
    }
  }

}
