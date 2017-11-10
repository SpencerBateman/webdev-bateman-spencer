import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../../../services/widget.service.client';
import { FlickrImageSearchComponent } from './flickr-image-search/flickr-image-search.component';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @ViewChild(FlickrImageSearchComponent)
  private flickrImageSearchComponent: FlickrImageSearchComponent;

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  widgetText: string;
  widgetWidth: number;
  widgetUrl: string;
  widgetType: string;


  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
        this.widget = widget;
      });
    });
  }

  updateWidget() {
    if (this.widgetText != null && this.widgetWidth != null) {
      this.widget.text = this.widgetText;
      this.widget.width = this.widgetWidth;
      this.widget.url = this.widgetUrl;
      this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((widget: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      });
    }
  }

}
