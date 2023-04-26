import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  user: any = {};

  constructor(public authService: AuthService){}

  ngOnInit(): void {
      this.authService.userInfo.subscribe(res => {
        this.user = res;
        if(this.user.roles){
          this.user.roles.replace("[", "");
          this.user.roles.replace("]", "");
        }
      });
  }

}
