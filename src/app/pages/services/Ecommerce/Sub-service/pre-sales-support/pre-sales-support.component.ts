import { Component , OnInit} from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from '../../../../../components/HomeComponents/ourAssets/ourAssets.component';

@Component({
    selector: 'app-pre-sales-support',
    standalone: true,
    templateUrl: './pre-sales-support.component.html',
    styleUrl: './pre-sales-support.component.css',
    imports: [
        FaqComponent,
        ServiceCaseStudyComponent,KnowBestComponent,RouterLink,CdnUrlDirective,
        RouterOutlet,ourAssetsComponent
    ]
})
export class PreSalesSupport implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Personalized Pre-Sales Support for E-Commerce: Enhance Sales | FBSPL',
      description:
        "We help you grow your e-commerce business with our pre-sales support, including 24/7 chat and email assistance, improving leads and customer experience. View our ecommerce services.",
      keywords: 'ecommerce sales, pre sales support',
      ogImage: '/Sub-service-Pages/policy 1 1.png'
    };
    this.seoService.setMetaTags(seoData);
  }
}
