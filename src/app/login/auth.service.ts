import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { User } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKENS = [
  { neptun: "ABC123", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODI0OTk2NjksImV4cCI6MTcxNDAzNTY2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5lcHR1biI6IkFCQzEyMyIsIm5hbWUiOiJJbnN0cnVjdG9yIEJvYiIsImVtYWlsIjoiYm9iLmluc3RydWN0b3JAY3VzdG9tdW5pLmh1Iiwicm9sZXMiOiJbSU5TVFJVQ1RPUixBRE1JTl0ifQ.Cayjwo0F8s7q1fbeK7pSrvZQfy6c0FwP7gAQxgQ9F_o" },
  { neptun: "ABC456", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODI0OTk2NjksImV4cCI6MTcxNDAzNTY2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5lcHR1biI6IkFCQzQ1NiIsIm5hbWUiOiJJbnN0cnVjdG9yIEpvaG4iLCJlbWFpbCI6ImpvaG4uaW5zdHJ1Y3RvckBjdXN0b211bmkuaHUiLCJyb2xlcyI6IltJTlNUUlVDVE9SXSJ9.QReL_1wYq96LOR84eNCC-0MfFPja0BK74THNt3wWmFE" },
  { neptun: "CBA123", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODI0OTk2NjksImV4cCI6MTcxNDAzNTY2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5lcHR1biI6IkNCQTEyMyIsIm5hbWUiOiJTdHVkZW50IEJvYiIsImVtYWlsIjoiYm9iLnN0dWRlbnRAY3VzdG9tdW5pLmh1Iiwicm9sZXMiOiJbU1RVREVOVF0ifQ.fKuhpJYVIqIYdFUsYFbjfxpxPoVuqNSba8cmTekanlg" },
  { neptun: "CBA456", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODI0OTk2NjksImV4cCI6MTcxNDAzNTY2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5lcHR1biI6IkNCQTQ1NiIsIm5hbWUiOiJTdHVkZW50IEpvaG4iLCJlbWFpbCI6ImpvaG4uc3R1ZGVudEBjdXN0b211bmkuaHUiLCJyb2xlcyI6IltTVFVERU5UXSJ9.J73P5033rWeJrtnZJhTR2CteKWtpXr0yYfTRFqzGhtU" },
  { neptun: "UKH1A7", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODI0OTk2NjksImV4cCI6MTcxNDAzNTY2OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5lcHR1biI6IlVLSDFBNyIsIm5hbWUiOiJBZG1pbiBPbGl2w6lyIiwiZW1haWwiOiJvbGl2ZXIuYWRtaW5AY3VzdG9tdW5pLmh1Iiwicm9sZXMiOiJbQURNSU5dIn0.prIh_bO3vvoVQcYBjabXeJJ2cqbKP4r6-GUw-n0ah2Y" }
]

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
      const jwt: any = TOKENS.find(it => {
        return it.neptun.toLowerCase() === login.neptun.toLowerCase();
      });
      return of(jwt.token).pipe(
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
