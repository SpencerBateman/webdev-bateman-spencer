import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user: any;
  username: string;
  firstName: string;
  lastName: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      //this.user = this.userService.findUserById(this.userId);
      this.userService.findUserById(this.userId).subscribe((user: any) => {
        this.user = user;
        console.log(this.user);
        this.username = this.user['username'];
        this.firstName = this.user['firstName'];
        this.lastName = this.user['lastName'];
      });
    });
  }

  updateProfile() {
    this.user.username = this.username;
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.userService.updateUser(this.userId, this.user);
    this.router.navigate(['/user', this.userId]);
  }
}
