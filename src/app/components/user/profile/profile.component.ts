import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { SharedService } from '../../../services/shared.service.client';

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
  errorFlag: boolean;

  constructor(private sharedService: SharedService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {
      this.user = this.sharedService.user || {};
      this.userId = this.user._id;
      this.username = this.user['username'];
      this.firstName = this.user['firstName'];
      this.lastName = this.user['lastName'];
    });
  }

  updateProfile() {
    if (this.username != null && this.firstName != null && this.lastName != null && this.username != '' && this.firstName != '' && this.lastName != '') {
      this.user.username = this.username;
      this.user.firstName = this.firstName;
      this.user.lastName = this.lastName;
      this.userService.updateUser(this.userId, this.user).subscribe((users: any) => {
        console.log(users);
      });
      this.userService.updateUser(this.userId, this.user);
      this.router.navigate(['/profile']);
    } else {
      this.errorFlag = true;
    }
  }

  logout() {
    this.userService.logout().subscribe((status) => {
      this.router.navigate(['/login']);
    });
  }
}
