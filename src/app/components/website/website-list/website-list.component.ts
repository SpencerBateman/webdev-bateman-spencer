import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '../../../services/website.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: string;
  websites: any;


  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  getWebsiteList() {
    return this.websiteService.findWebsiteByUser(this.userId);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websites = this.getWebsiteList();
    });
  }
}
