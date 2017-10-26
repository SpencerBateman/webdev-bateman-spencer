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
      console.log('here');
      this.pageService.findPageById(this.pageId).subscribe((page: any) => {
        console.log(page);
        this.page = page;
        this.pageName = this.page.name;
        this.pageDescription = this.page.description;
      });
    });

  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe((page: any) => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
    });
  }

  updatePage() {
    this.page.name = this.pageName;
    this.page.description = this.pageDescription;
    this.pageService.updatePage(this.pageId, this.page).subscribe((page: any) => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
    });
  }
}
