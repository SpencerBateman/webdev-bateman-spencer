import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class PageService {
  constructor() { }

  pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ];

  //adds the page parameter instance to the local pages array.
  //The new page's websiteId is set to the websiteId parameter
  createPage(websiteId: string, page: any) {
    page._id = Math.random();
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  // retrieves the pages in local pages array whose websiteId matches the parameter websiteId
  findPageByWebsiteId(websiteId: string) {
    const list_of_pages = [];
    for (let x = 0; x < this.pages.length; x ++) {
      if (websiteId === this.pages[x].websiteId) {
        list_of_pages.push(this.pages[x]);
      }
    }
    return list_of_pages;
  }

  // retrieves the page in local pages array whose _id matches the pageId parameter
  findPageById(pageId: string) {
    for (let x = 0; x < this.pages.length; x ++) {
      if (this.pages[x]._id === pageId) {
        return this.pages[x];
      }
    }
  }

  // updates the page in local pages array whose _id matches the pageId parameter
  updatePage(pageId: string, page: any) {
    for (let x = 0; x < this.pages.length; x ++) {
      if (this.pages[x]._id === pageId) {
        this.pages[x] = page;
      }
    }
  }

  // removes the page from local pages array whose _id matches the pageId parameter
  deletePage(pageId: string) {
    for (let x = 0; x < this.pages.length; x ++) {
      if (pageId === this.pages[x]._id) {
        this.pages.splice(x, 1);
      }
    }
  }
}
