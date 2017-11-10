import { Component, OnInit } from '@angular/core';
import { FlickrImageService } from '../../../../../services/flickr.service.client';
import {WidgetService} from "../../../../../services/widget.service.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})

export class FlickrImageSearchComponent implements OnInit {

  searchText: string;
  photos: any;
  websiteId: string;
  pageId: string;
  widget: any;
  widgetId: string;

  constructor(private flickrService: FlickrImageService, private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.photos = [];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
        this.widget = widget;
      });
    });
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    console.log(photo);
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    this.widget.url = url;
    this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((widget: any) => {
      console.log(widget);
    });
  }
}
