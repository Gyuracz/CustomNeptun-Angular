import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { User } from './user.model';

const URL = "api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private requestService: RequestService) { }

  getUsers(): Observable<any>{
    return this.requestService.get<Array<User>>(URL);
  }

  getUserById(id: number): Observable<any>{
    return this.requestService.get(`${URL}/${id}`);
  }

  createUser(user: User): Observable<any>{
    return this.requestService.post(`${URL}/`, user);
  }

  updateUser(user: User): Observable<any>{
    return this.requestService.put(`${URL}/${user.id}`, user);
  }

  deleteUserById(id: number): Observable<any>{
    return this.requestService.delete(`${URL}/${id}`);
  }
  
}
