import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs'
import { Semester } from './semester.model';

const URL = "api/semesters";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private requestService: RequestService) { }

  getSemesters(): Observable<any>{
    return this.requestService.get<Array<Semester>>(URL);
  }

  getSemesterById(id: number): Observable<Semester>{
    return this.requestService.get(`${URL}/${id}`);
  }

  createSemester(semester: Semester): Observable<any>{
    return this.requestService.post(`${URL}/`, semester);
  }

  updateSemester(semester: Semester): Observable<any>{
    return this.requestService.put(`${URL}/`, semester);
  }

  deleteSemesterById(id: number): Observable<any>{
    return this.requestService.delete(`${URL}/${id}`);
  }

}
