import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { SubjectService } from '../subject/subject.service';
import { Student } from './student.model';
import { Subject } from '../subject/subject.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablerOrderPipe } from '../tabler-order.pipe';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent implements OnInit {

  students: Array<Student> = [];
  subjects: Array<Subject> = [];
  filterForm!: FormGroup;
  filterIcon = false;
  sort = {
    column: "",
    direction: ""
  };

  constructor(private studentService: StudentService, private subjectService: SubjectService, private formBuilder: FormBuilder){}

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
    this.studentService.getStudents().subscribe(data => {
      for(var student of data){
        for(var subjectId of student.subjectIds){
          for(var it of this.subjects){
            if(subjectId === it.id){
              student.subjectNames.push(it.name);
            }
          }
        }
      }
      this.students = data;
    });
  }

  onDeleteStudent(student: Student){
    this.studentService.deleteStudentById(student.id).subscribe();
    this.getStudents();
  }

  changeSorting(column: string, direction: string){
    if(this.sort.column == column && this.sort.direction == direction){
      this.sort.column = "";
      this.sort.direction = "";
      this.getStudents();
    }else{
      this.sort.column = column;
      this.sort.direction = direction;
      this.students = new TablerOrderPipe().transform(this.students, this.sort);
    }
  }

}
