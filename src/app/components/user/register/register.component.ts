import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  firstName: string;
  lastName: string;
  password: string;
  conf_password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(username, firstName, lastName, password, conf_password) {
    if (password === conf_password) {
      const user = {_id: 0, username: username, password: password, firstName: firstName, lastName: lastName}
      this.userService.createUser(user);
    }
  }

}
