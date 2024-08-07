import { Component , OnInit} from '@angular/core';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-new-business',
    standalone: true,
    templateUrl: './new-business.component.html',
    styleUrl: './new-business.component.css',
    imports: [
    FaqComponent, KnowBestComponent,
    ServiceCaseStudyComponent, CdnUrlDirective,
    ourAssetsComponent
]
})
export class newBusinessComponent implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsource Insurance New Business Setup Services - FBSPL | ',
      description:
        "Onboard clients with FBSPL's new business setup services. Our team of insurance BPO experts handles efficient setup for insurance carriers and agencies.",
      keywords: "insurance back office, insurance new business",
      ogImage: '/Insurance new business/Insurance new business copy.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
