import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: any = {};
  incorrect = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      neptun:  ["", { validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^[a-zA-z](?=.*[a-zA-Z0-9]).{5,}$")], updateOn: "change" }],
      password: ["", { validators: [Validators.required], updateOn: "change" }]
    });
  }

  onSubmit(loginUser: any){
    this.userService.getUsers().subscribe(users => {
      this.user = users.find((it: User) => {
        return it.neptun.toLowerCase() === loginUser.neptun.toLowerCase() && it.password === loginUser.password;
      });
      if(this.user){
        this.authService.login(this.user).subscribe(res => {
          if(res){
            this.router.navigate(["/"]);
          }
        });
      }else{
        this.incorrect = true;
      }
    });
  }

  get neptun(){
    return this.loginForm.get("neptun");
  }

  getNeptunErrorMessage(){
    if (this.neptun?.dirty || this.neptun?.touched) {
      if (this.neptun?.hasError('required')) return 'You must enter a value!';
      if (this.neptun?.hasError('maxlength')) return 'You can enter exactly 6 characters!';
      if (this.neptun?.hasError('minlength')) return 'You can enter exactly 6 characters!';
      if (this.neptun?.hasError('pattern')) return 'It have not to start with a number!';
    }
    return '';
  }

}
