import { Component , OnInit} from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-claim-management',
    standalone: true,
    templateUrl: './claim-management.component.html',
    styleUrl: './claim-management.component.css',
    imports: [
    FaqComponent, KnowBestComponent,
    ServiceCaseStudyComponent, CdnUrlDirective,
  ourAssetsComponent
]
})
export class claimManagement implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Insurance Claim Processing & Management Services - FBSPL',
      description:
        "Our comprehensive claim management services handle your complex and time-consuming claim processing procedures, enhancing efficiency and customer satisfaction for your business.",
      keywords: 'insurance claim management, claims processing outsourcing, insurance claim outsourcing',
      ogImage : '/Sub-service-Pages/policy 1 1.png'
    };
    this.seoService.setMetaTags(seoData);
  }
}
