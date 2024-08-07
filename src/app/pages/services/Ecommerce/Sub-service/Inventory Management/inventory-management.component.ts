import { Component , OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";
@Component({
    selector: 'app-inventory-management',
    standalone: true,
    templateUrl: './inventory-management.component.html',
    styleUrl: './inventory-management.component.css',
    imports: [
    FaqComponent,
    ServiceCaseStudyComponent, KnowBestComponent, RouterLink, RouterOutlet, CdnUrlDirective,
    ourAssetsComponent
]
})
export class InventoryManagement implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsource Inventory Management Services | FBSPL',
      description:
        "Outsource inventory management services to FBSPL to manage your inventory efficiently with the latest technologies. Learn about our SKU & supply management, product tracking & more.",
      keywords: 'ecommerce outsourcing services, outsource inventory management',
      ogImage: '/ogImage/Inventory management - banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
