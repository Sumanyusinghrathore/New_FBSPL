import { Component , OnInit} from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-order-management',
    standalone: true,
    templateUrl: './order-management.component.html',
    styleUrl: './order-management.component.css',
    imports: [
    FaqComponent,
    ServiceCaseStudyComponent, KnowBestComponent, RouterLink, RouterOutlet, CdnUrlDirective,
    ourAssetsComponent
]
})
export class OrderManagement implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsource eCommerce Order Processing & Management Services | FBSPL',
      description:
        "FBSPL order management solution provides end-to-end support on processing, tracking, shipping inquiries, and more enhancing your complete e-commerce operations.",
      keywords: 'ecommerce order processing, ecommerce order management',
      ogImage: '/ogImage/Order management-banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }

}
