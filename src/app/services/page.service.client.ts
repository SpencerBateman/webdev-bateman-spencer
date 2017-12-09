import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class PageService {
  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;

  //adds the page parameter instance to the local pages array.
  //The new page's websiteId is set to the websiteId parameter
  createPage(websiteId: string, page: any) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page).map((response: Response) => {
      return response.json();
    });
  }

  // retrieves the pages in local pages array whose websiteId matches the parameter websiteId
  findPageByWebsiteId(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // retrieves the page in local pages array whose _id matches the pageId parameter
  findPageById(pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // updates the page in local pages array whose _id matches the pageId parameter
  updatePage(pageId: string, page: any) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.put(url, page).map((response: Response) => {
      return response.json();
    });
  }

  // removes the page from local pages array whose _id matches the pageId parameter
  deletePage(pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId;

    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
