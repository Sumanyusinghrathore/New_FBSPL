import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-pre-sales-support',
    standalone: true,
    templateUrl: './logistic-management.component.html',
    styleUrl: './logistic-management.component.css',
    imports: [
    FaqComponent,
    ServiceCaseStudyComponent, KnowBestComponent, RouterLink, RouterOutlet, CdnUrlDirective,
    ourAssetsComponent
]
})
export class LogisticManagement implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Logistics Management Services (LMS) |  Ecommerce BPO | FBSPL ',
      description:
        "Our logistics management team ensure efficient logistics, supply chain management and timely deliveries for your e-commerce business.",
      keywords: 'ecommerce logistics management, ecommerce bpo',
      ogImage:'/ogImage/Logistic Management - E-com Main Banner 03.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
