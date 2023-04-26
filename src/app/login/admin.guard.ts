import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Roles } from './roles.enum';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user: any;
    this.authService.userInfo.subscribe(res => {
        user = res;
    });
    if(this.authService.isAuthenticated() && user.roles.includes(Roles.ADMIN)){
      return true;
    }else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): boolean {
    let user: any;
    this.authService.userInfo.subscribe(res => {
        user = res;
    });
    if(this.authService.isAuthenticated() && user.roles.includes(Roles.ADMIN)){
      return true;
    }else{
      return false;
    }
  }

  checkLogin(url: string) {
    if (this.authService.isAuthenticated()) {
      return true;
    }else{
      this.router.navigate(['/login'] );
      return false;
    }
  }
  
}