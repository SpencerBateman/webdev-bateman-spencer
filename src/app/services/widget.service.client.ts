import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting the service into module
@Injectable()

export class WidgetService {
  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;

  // adds the widget parameter instance to the local widgets array.
  // The new widget's pageId is set to the pageId parameter
  createWidget(pageId: string, widget: any) {
    console.log(widget);
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget).map((response: Response) => {
      return response.json();
    });
  }

  // retrieves the widgets in local widgets array whose pageId matches the parameter pageId
  findWidgetsByPageId(pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // retrieves the widget in local widgets array whose _id matches the widgetId parameter
  findWidgetById(widgetId: string) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // updates the widget in local widgets array whose _id matches the widgetId parameter
  updateWidget(widgetId: string, widget: any) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.put(url, widget).map((response: Response) => {
      return response.json();
    });
  }

  // removes the widget from local widgets array whose _id matches the widgetId parameter
  deleteWidget(widgetId: string) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
