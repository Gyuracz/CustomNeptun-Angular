import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  myBackgroundImageUrl: string = "../assets/images/wallpaper.png";

  constructor(public authService: AuthService){}

  get isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
  }
  
}
