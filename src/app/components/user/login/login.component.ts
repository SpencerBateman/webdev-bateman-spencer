import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string; //see usage as string interpolation
  disabledFlag: boolean;
  inputText: string;

  constructor() { }

  ngOnInit() {
    this.title = 'This is the login page';
    this.disabledFlag = true;
  }

  // binding click event
  buttonClicked(event: any) {
    console.log(event); // your custom code on button click
  }
}
