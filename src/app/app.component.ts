import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  private myBackgroundImageUrl: string = "../assets/images/wallpaper.png";

  constructor(){}
  ngOnInit(): void {
    
  }
  
}
