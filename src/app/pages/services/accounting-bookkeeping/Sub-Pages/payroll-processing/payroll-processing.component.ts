import { Component,OnInit } from '@angular/core';
import { SeoService } from '../../../../../services/seo/seo.service';
import { SeoData } from '../../../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../../../components/HomeComponents/know-best/know-best.component';
import { ServiceCaseStudyComponent } from "../../../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../../../directives/cdn-url.directive';
import { ourAssetsComponent } from "../../../../../components/HomeComponents/ourAssets/ourAssets.component";

@Component({
    selector: 'app-payroll-processing',
    standalone: true,
    templateUrl: './payroll-processing.component.html',
    styleUrl: './payroll-processing.component.css',
    imports: [
    FaqComponent, KnowBestComponent,
    ServiceCaseStudyComponent, CdnUrlDirective,
    ourAssetsComponent
]
})
export class PayrollProcessingComponent implements OnInit{
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Payroll Outsourcing Services | Payroll Processing & Solution | FBSPL',
      description:
        "Partner with us to simplify and automate your payroll management. Let us help you save time on processing, payments, compliance, and reporting. ",
      keywords: 'payroll management, payroll outsourcing services',
      ogImage : '/accoutning Payroll Processing/Main-banner.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
}
