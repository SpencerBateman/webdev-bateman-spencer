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

  register() {
    if (this.password === this.conf_password) {
      var user = {username: this.username, password: this.password, firstName: this.firstName, lastName: this.lastName}
      this.userService.createUser(user).subscribe((user) => {
        this.router.navigate(['/user', user._id]);
      });
    }
  }

}
