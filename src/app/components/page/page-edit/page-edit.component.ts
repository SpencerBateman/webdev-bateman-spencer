import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../../services/page.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageName: string;
  pageDescription: string;
  pageId: string;
  page: any;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid']
      this.page = this.pageService.findPageById(this.pageId);
      this.pageName = this.page.name;
      this.pageDescription = this.page.description;
    });

  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
  }

  updatePage() {
    this.page.name = this.pageName;
    this.page.description = this.pageDescription;
    this.pageService.updatePage(this.pageId, this.page);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
  }


}
