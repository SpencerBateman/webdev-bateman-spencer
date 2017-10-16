import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})

export class WidgetEditComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  widgetName: string;
  widgetText: string;
  widgetSize: number;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });

    this.widget = this.widgetService.findWidgetById(this.widgetId);
    this.widgetName = this.widget.name;
    this.widgetText = this.widget.text;
    this.widgetSize = this.widget.size;
  }

  updateWidget() {
    this.widget.name = this.widgetName;
    this.widget.text = this.widgetText;
    this.widget.size = this.widgetSize;
    this.widgetService.updateWidget(this.widgetId, this.widget);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget'])
  }
}
