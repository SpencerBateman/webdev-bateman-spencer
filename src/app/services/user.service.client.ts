import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SharedService } from './shared.service.client';
import { AuthenticationService } from './authentication.service.client';

// injecting the service into module
@Injectable()

export class UserService {
  options: RequestOptions = new RequestOptions();

  constructor(private http: Http, private router: Router, private sharedService: SharedService) { }

  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById,
    'register': this.register,
    'login': this.login
  };

  register(username, password) {
    const url = 'http://localhost:3100/api/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  logout() {
    const url = 'http://localhost:3100/api/logout';
    this.options.withCredentials = true;
    return this.http.post(url, '', this.options)
      .map((status) => {
        return status;
      });
  }

  loggedIn() {
    this.options.withCredentials = true;
    const url = 'http://localhost:3100/api/loggedIn';
    return this.http.post(url, '', this.options)
      .map((res: Response) => {
        const user = res.json();
        console.log(user);
        if (user !== 0) {
          console.log('hello')
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  login(username, password) {
    const url = 'http://localhost:3100/api/login';
    const credentials = {
      username: username,
      password: password
    };

    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }


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
