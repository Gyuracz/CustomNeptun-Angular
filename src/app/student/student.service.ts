import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs'
import { Student } from './student.model';

const URL = "api/students";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private requestService: RequestService) { }

  getStudents(): Observable<any>{
    return this.requestService.get<Array<Student>>(URL);
  }

  getStudentById(id: number): Observable<any>{
    return this.requestService.get(`${URL}/${id}`);
  }

  createStudent(student: Student): Observable<any>{
    return this.requestService.post(`${URL}/`, student);
  }

  updateStudent(student: Student): Observable<any>{
    return this.requestService.put(`${URL}/`, student);
  }

  deleteStudentById(id: number): Observable<any>{
    return this.requestService.delete(`${URL}/${id}`);
  }

}
