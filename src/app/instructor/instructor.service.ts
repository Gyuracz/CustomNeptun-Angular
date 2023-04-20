import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs'
import { Instructor } from './instructor.model';

const URL = "api/instructors";

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private requestService: RequestService) { }

  getInstructors(): Observable<any>{
    return this.requestService.get<Array<Instructor>>(URL);
  }

  getInstructorById(id: number): Observable<Instructor>{
    return this.requestService.get(`${URL}/${id}`);
  }

  createInstructor(instructor: Instructor): Observable<any>{
    return this.requestService.post(`${URL}/`, instructor);
  }

  updateInstructor(instructor: Instructor): Observable<any>{
    return this.requestService.put(`${URL}/`, instructor);
  }

  deleteInstructorById(id: number): Observable<any>{
    return this.requestService.delete(`${URL}/${id}`);
  }

}
