import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { SharedService } from '../../../services/shared.service.client';

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

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.username, this.password).subscribe((user) =>  {
        this.sharedService.user = user;
        this.router.navigate(['/profile']);
      });
  }
}
