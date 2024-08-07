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
    selector: 'app-catalog-management',
    standalone: true,
    templateUrl: './catalog-management.component.html',
    styleUrl: './catalog-management.component.css',
    imports: [
    FaqComponent,
    ServiceCaseStudyComponent, KnowBestComponent, RouterLink, RouterOutlet, CdnUrlDirective,
  ourAssetsComponent
]
})
export class CatalogManagement implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'eCommerce Catalog Management Solutions | FBSPL',
      description:
        "Our e-commerce catalog management solutions include inventory management, product listing, catalog indexing, and updates. Our team ensures quality and follows industry best practices.",
      keywords: 'catalog management services, catalog management, ecommerce catalog management',
      ogImage :'/ogImage/Catalog management- Banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
