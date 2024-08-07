import { Component, OnInit, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { FaqComponent } from '../../components/HomeComponents/faq/faq.component';
import { ServiceVimeoComponent } from '../../components/HomeComponents/service-vimeo/service-vimeo.component';
import { ServiceCaseStudyComponent } from '../../components/HomeComponents/service-case-study/service-case-study.component';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ourAssetsComponent } from "../../components/HomeComponents/ourAssets/ourAssets.component";
@Component({
  selector: 'app-main-service',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FaqComponent,
    ServiceVimeoComponent,
    ServiceCaseStudyComponent,
    CdnUrlDirective,
    ourAssetsComponent
],
  templateUrl: './main-service.component.html',
  styleUrl: './main-service.component.css',
})
export class MainServiceComponent implements OnInit {
  seoService: any;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener(
        'orientationchange',
        this.handleOrientationChange.bind(this)
      );
    }
  }
  ngOnInit(): void {
    const seoData: SeoData = {
      title:
        'FBSPL - Business Process Outsourcing (BPO) Services |BPM Consultants',
      description:
        "FBSPL's expert consultation and BPM services. From Insurance, Ecommerce, RPO, Accounting & Bookkeeping to Customer Support and more. Contact Us!",
      keywords: 'bpo services, outsourcing solutions, bpm',
    };
    this.seoService.setMetaTags(seoData);
  }
  caseStudyData = {
    title: 'Insurance',
  };
  handleOrientationChange() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.run(() => {
        if (window.orientation === 0 || window.orientation === 180) {
          console.log('Portrait mode');
        } else if (window.orientation === 90 || window.orientation === -90) {
          console.log('Landscape mode');
        }
        // Refresh the page
        this.router.navigate([this.router.url]);
      });
    }
  }
}
