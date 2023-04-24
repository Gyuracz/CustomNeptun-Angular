import { Component, OnInit } from '@angular/core';
import { InstructorService } from './instructor.service';
import { Instructor } from './instructor.model';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablerOrderPipe } from '../tabler-order.pipe';
import { UserService } from '../login/user.service';
import { Roles } from '../login/roles.enum';
import { User } from '../login/user.model';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.less']
})
export class InstructorComponent implements OnInit {

  instructors: Array<User> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };

  constructor(private userService: UserService, private instructorService: InstructorService, private subjectService: SubjectService, private formBuilder: FormBuilder){}

  ngOnInit(){
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
    // this.instructorService.getInstructors().subscribe(data => {
    //   for(var instructor of data){
    //     for(var subjectId of instructor.subjectIds){
    //       for(var it of this.subjects){
    //         if(subjectId === it.id){
    //           instructor.subjectNames.push(it.name);
    //         }
    //       }
    //     }
    //   }
    //   this.instructors = data;
    // });
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
    // this.instructorService.deleteInstructorById(instructor.id).subscribe();
    this.userService.deleteUserById(instructor.id).subscribe();
    this.instructors = [];
    this.getInstructors();
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
