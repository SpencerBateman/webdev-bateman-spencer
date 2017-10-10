import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { enviornment } from '../../enviornments/enviornment';
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
  }

  // retrieves the pages in local pages array whose websiteId matches the parameter websiteId
  findPageByWebsiteId(websiteId: string) {
  }

  // retrieves the page in local pages array whose _id matches the pageId parameter
  findPageById(pageId: string) {
  }

  // updates the page in local pages array whose _id matches the pageId parameter
  updatePage(pageId: string, page: any) {
  }

  // removes the page from local pages array whose _id matches the pageId parameter
  deletePage(pageId: string) {
  }
}
