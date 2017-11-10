import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

// injecting the service into module
@Injectable()

export class FlickrImageService {
  key = "f9538dbe339cc25946f629d74f993897";
  secret = "5e41cb0989a36856";
  urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

  constructor(private _http: Http) { }

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }
}
