import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { enviornment } from '../../enviornments/enviornment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class UserService {
  constructor() { }

  users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById
  };

  // Boy oh boy I wish I could write tests for this

  // adds the user parameter instance to the local users array
  createUser(user: any) {
    user._id = Math.random();
    this.users.push(user);
    return user;
  }

  // returns the user in local users array whose _id matches the userId parameter
  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x ++) {
      if (userId === this.users[x]._id) {
        return this.users[x];
      }
    }
  }

  // returns the user in local users array whose username matches the parameter username
  findUserByUsername(username: string) {
    for (let x = 0; x < this.users.length; x ++) {
      if (username === this.users[x].username) {
        return this.users[x];
      }
    }
  }

  //returns the user whose username and password match the username and password parameters
  findUserByCredentials(username: string, password: string) {
    for (let x = 0; x < this.users.length; x ++) {
      if (username === this.users[x].username && password === this.users[x].password) {
        return this.users[x];
      }
    }
  }

  // updates the user in local users array whose _id matches the userId parameter
  updateUser(userId: string, user: any) {
    for (let x = 0; x < this.users.length; x ++) {
      if (userId === this.users[x]._id) {
        this.users[x] = user;
      }
    }
  }

  // removes the user whose _id matches the userId parameter
  deleteUser(userId: string) {
    for (let x = 0; x < this.users.length; x ++) {
      if (userId === this.users[x]._id) {
        this.users.splice(x, 1);
      }
    }
  }
}
