import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from '../../../../../components/HomeComponents/service-case-study/service-case-study.component';
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
  selector: 'app-policy-processing',
  standalone: true,
  templateUrl: './policy-processing.component.html',
  styleUrl: './policy-processing.component.css',
  imports: [
    FaqComponent,
    KnowBestComponent,
    ServiceCaseStudyComponent,
    CdnUrlDirective,
  ourAssetsComponent
],
})
export class PolicyProcessingComponent implements OnInit {
  constructor(private seoService: SeoService) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title:
        'Outsource Insurance Policy Processing & Management Services - FBSPL',
      description:
        'At FBSPL, we customize your policy processing and management services to meet industry standards. Our services include policy checking, loss run processing, policy renewal, and overall management.',
      keywords:
        'insurance policy processing,  outsourcing insurance policy management',
      ogImage:
        '/insurane policy processing/Policy Processing Main Banner 1.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
}
