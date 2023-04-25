import { Injectable } from '@angular/core';
import { tap, BehaviorSubject, Observable, of, map } from 'rxjs';
import { User } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  user: any = {};

  constructor() {
    this.loadUserInfo();
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem("access_token")){
      return true;
    }else{
      return false;
    }
  }

  login(login: User): Observable<any>{
    if(login && login.neptun && login.password){
      const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
      return of(sampleJWT).pipe(
        map((token) => {
          if(!token){
            return {};
          }
          localStorage.setItem("access_token", token);
          const decodedUser = this.jwtHelper.decodeToken(token);
          this.userInfo.next(decodedUser);
          this.user = login;
          return login;
        }));
      }
    return of({});
  }

  logout(){
    localStorage.removeItem("access_token");
    this.user = {};
  }

  loadUserInfo() {
    let userdata = this.userInfo.getValue();
    if (!userdata) {
      const access_token = localStorage.getItem('access_token');
      if(access_token){
        userdata = this.jwtHelper.decodeToken(access_token);
        this.userInfo.next(userdata);
      }
    }
    return this.user;
  }

  getAuthorizationToken() {
    const token = localStorage.getItem('access_token');
    let currentUser: any;
    if(token){
      currentUser = JSON.parse(token);
    }
    return currentUser.token;
  }
  
}
