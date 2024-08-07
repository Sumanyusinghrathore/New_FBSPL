import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from '../../../../../components/HomeComponents/ourAssets/ourAssets.component';

@Component({
    selector: 'app-data-management',
    standalone: true,
    templateUrl: './data-management.component.html',
    styleUrl: './data-management.component.css',
    imports: [
        FaqComponent,
        ServiceCaseStudyComponent,KnowBestComponent,RouterLink, RouterOutlet,CdnUrlDirective,ourAssetsComponent
    ]
})
export class DataManagement implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Ecommerce Data Management Solutions | FBSPL',
      description:
        "Our data management team handles the details and complexities of your ecommerce business's product data, customer data, images, and bookkeeping. Consult with our team today.",
      keywords: 'ecommerce data management, data management services',
      ogImage: '/data-management/main-banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
