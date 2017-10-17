import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class WebsiteService {
  constructor() { }

  websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
  ];

  // adds the website parameter instance to the local websites array.
  // The new website's developerId is set to the userId parameter
  createWebsite(userId: string, website: any) {
    website._id = Math.floor(Math.random() * 1000 + 1).toString();
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }

  // retrieves the websites in local websites array whose developerId matches the parameter userId
  findWebsiteByUser(userId: string) {
    var websiteArray = [];
    for (let i = 0; i < this.websites.length; i++ ) {
      if (this.websites[i].developerId === userId) {
        websiteArray.push(this.websites[i]);
      }
    }
        return websiteArray;
  }

  // retrieves the website in local websites array whose _id matches the websiteId parameter
  findWebsiteById(websiteId: string) {
    for (let i = 0; i < this.websites.length; i++ ) {
      if (this.websites[i]._id === websiteId) {
        return this.websites[i];
      }
    }
  }

  // updates the website in local websites array whose _id matches the websiteId parameter
  updateWebsite(websiteId: string, website: any) {
    for (let i = 0; i < this.websites.length; i++ ) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i] = website;
      }
    }
  }

  // removes the website from local websites array whose _id matches the websiteId parameter
  deleteWebsite(websiteId: string) {
    for (let i = 0; i < this.websites.length; i++ ) {
      if (this.websites[i]._id === websiteId) {
        this.websites.splice(i, 1);
      }
    }

  }
}
