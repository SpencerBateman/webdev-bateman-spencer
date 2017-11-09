import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  widgetText: string;
  widgetSize: number;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
        this.widget = widget;
        this.widgetText = widget.text;
        this.widgetSize = widget.size;
      });
    });
  }

  updateWidget() {
    if (this.widgetText != null && this.widgetSize != null && this.widgetSize > 0 && this.widgetSize < 7) {
      console.log('Hello');
      console.log(this.widgetText + 'Hello');
      this.widget.text = this.widgetText;
      this.widget.size = this.widgetSize;
      console.log(this.widget);
      this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((widget: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget'])
      });
    }
  }
}
