import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { SharedService } from '../../../services/shared.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.errorFlag = false;
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((user) => {
      this.sharedService.user = user;
      console.log(this.sharedService.user);
      this.router.navigate(['/profile']);
    });
  }
}
