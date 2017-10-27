import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class WebsiteService {
  constructor(private http: Http) { }

  // adds the website parameter instance to the local websites array.
  // The new website's developerId is set to the userId parameter
  createWebsite(userId: string, website: any) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    });
  }

  // retrieves the websites in local websites array whose developerId matches the parameter userId
  findWebsiteByUser(userId: string) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // retrieves the website in local websites array whose _id matches the websiteId parameter
  findWebsiteById(websiteId: string) {
    const url = 'http://localhost:3100/api/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // updates the website in local websites array whose _id matches the websiteId parameter
  updateWebsite(websiteId: string, website: any) {
    const url = 'http://localhost:3100/api/website/' + websiteId;
    return this.http.put(url, website).map((response: Response) => {
      return response.json();
    });
  }

  // removes the website from local websites array whose _id matches the websiteId parameter
  deleteWebsite(websiteId: string) {
    const url = 'http://localhost:3100/api/website/' + websiteId;

    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
