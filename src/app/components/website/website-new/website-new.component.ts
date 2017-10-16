import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '../../../services/website.service.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: string;
  website: any;
  websiteName: string;
  websiteDescription: string;
  websites: any;
  websiteId: string;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
    });
    this.websites = this.websiteService.findWebsiteByUser(this.userId);
    this.website = [];
  }

  createWebsite() {
    if (this.websiteName != null && this.websiteDescription != null) {
      const new_website = {_id: 0, name: this.websiteName, developerId: this.userId, description: this.websiteDescription}
      console.log(this.websiteService.createWebsite(this.userId, new_website));
      this.router.navigate(['./user', this.userId, 'website']);
    }
  }
}
