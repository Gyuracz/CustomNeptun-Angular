import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs'
import { Subject } from './subject.model';

const URL = "api/subjects";

@Injectable({
  providedIn: 'root'
})
export class SubjectService{

  constructor(private requestService: RequestService) { }

  getSubjects(): Observable<any>{
    return this.requestService.get<any>(URL);
  }

  getSubjectById(id: number): Observable<any>{
    return this.requestService.get(`${URL}/${id}`);
  }

  createSubject(subject: Subject): Observable<any>{
    return this.requestService.post(`${URL}/`, subject);
  }

  updateSubject(subject: Subject): Observable<any>{
    return this.requestService.put(`${URL}/`, subject);
  }

  deleteSubjectById(id: number): Observable<any>{
    return this.requestService.delete(`${URL}/${id}`);
  }

}