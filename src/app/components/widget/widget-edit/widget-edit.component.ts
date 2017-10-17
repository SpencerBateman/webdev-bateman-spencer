import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(WidgetHeaderComponent)
  private headerComponent: WidgetHeaderComponent;

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: any;
  widgetSize: number;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    });

  }

  updateWidget() {
    console.log('checked');
    switch(this.widget.widgetType) {
        case 'HEADING': this.headerComponent.updateWidget(); break;
    }
  }
}
