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
  errorFlag: boolean;

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.username != null && this.firstName != null && this.lastName != null && this.password != null && this.conf_password != null) {
      this.userService.register(this.username, this.password, this.firstName, this.lastName).subscribe((user) =>  {
        this.sharedService.user = user;
        this.router.navigate(['/profile']);
      });
    } else {
      this.errorFlag = true;
    }
  }
}
