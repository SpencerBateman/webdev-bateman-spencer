import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });
  }

  createWidget(type: string) {
    const new_widget = {widgetType: type, pageId: this.pageId}
    const new_new_widget = this.widgetService.createWidget(this.pageId, new_widget);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', new_new_widget._id]);
  }
}
