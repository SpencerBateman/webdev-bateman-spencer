import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: string;
  website: any;
  websiteId: string;
  pageName: string;
  pageDescription: string;
  errorFlag: boolean;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
    });
  }

  newPage() {
    if (this.pageName != null && this.pageDescription != null) {

      const new_page = {name: this.pageName, _website: this.websiteId, description: this.pageDescription};

      this.pageService.createPage(this.websiteId, new_page).subscribe((page: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
      });
    } else {
      this.errorFlag = true;
    }
  }
}
