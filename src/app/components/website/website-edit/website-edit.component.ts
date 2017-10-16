import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '../../../services/website.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

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
      this.websiteId = params['wid'];
      this.website = this.websiteService.findWebsiteById(this.websiteId);
      this.websites = this.websiteService.findWebsiteByUser(this.userId);
      this.websiteName = this.website.name;
      this.websiteDescription = this.website.description;
    });
  }

  editWebsite() {
    this.website.name = this.websiteName;
    this.website.description = this.websiteDescription;
    this.websiteService.updateWebsite(this.websiteId, this.website);
    this.router.navigate(['./user', this.userId, 'website', this.websiteId]);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
    this.router.navigate(['./user', this.userId, 'website']);
  }

}
