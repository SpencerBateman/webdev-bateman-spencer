import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';
import { WidgetImageComponent } from './widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './widget-youtube/widget-youtube.component';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})

export class WidgetEditComponent implements OnInit {

  @ViewChild(WidgetHeaderComponent)
  private headerComponent: WidgetHeaderComponent;

  @ViewChild(WidgetImageComponent)
  private widgetImageComponent: WidgetImageComponent;

  @ViewChild(WidgetYoutubeComponent)
  private widgetYoutubeComponent: WidgetYoutubeComponent;

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  type: string;
  widgetSize: number;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(this.widgetId).subscribe((widget) => {
        this.widget = widget;
        this.type = widget.widgetType;
      });
    });

  }

  deleteMe() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(() => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    });
  }

  updateWidget() {
    switch(this.type) {
      case "HEADING": this.headerComponent.updateWidget(); break;
      case "IMAGE": this.widgetImageComponent.updateWidget(); break;
      case "YOUTUBE": this.widgetYoutubeComponent.updateWidget(); break;
    }
  }
}
