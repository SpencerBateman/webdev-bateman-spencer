import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class UserService {
  constructor(private http: Http) { }

  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById
  };

  // adds the user parameter instance to the local users array
  createUser(user: any) {
    const url = 'http://localhost:3100/api/user';
    return this.http.post(url, user).map((response: Response) => {
      return response.json();
    });
  }

  // returns the user in local users array whose _id matches the userId parameter
  findUserById(userId: string) {
    const url = 'http://localhost:3100/api/user/' + userId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // returns the user in local users array whose username matches the parameter username
  findUserByUsername(username: string) {
    const url = 'http://localhost:3100/api/user?username=' + username;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  //returns the user whose username and password match the username and password parameters
  findUserByCredentials(username: string, password: string) {
    var url = 'http://localhost:3100/api/user?username=' + username + '&password=' + password;

    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // updates the user in local users array whose _id matches the userId parameter
  updateUser(userId: string, user: any) {
    const url = 'http://localhost:3100/api/user/' + userId;

    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  // removes the user whose _id matches the userId parameter
  deleteUser(userId: string) {
    const url = 'http://localhost:3100/api/user/' + userId;

    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
