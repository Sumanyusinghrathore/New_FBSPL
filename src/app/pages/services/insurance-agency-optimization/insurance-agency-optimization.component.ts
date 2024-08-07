import { Component , OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink , RouterOutlet } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToolsSectionModule } from '../../../components/ServiceComponent/ToolsSection/ToolsSection.module';
import { ourAssetsModule } from '../../../components/HomeComponents/ourAssets/ourAssets.module';
import { SeoService } from '../../../services/seo/seo.service';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { ServiceVimeoComponent } from "../../../components/HomeComponents/service-vimeo/service-vimeo.component";
import { ServiceCaseStudyComponent } from "../../../components/HomeComponents/service-case-study/service-case-study.component";
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';
import { ourAssetsComponent } from "../../../components/HomeComponents/ourAssets/ourAssets.component";
@Component({
    selector: 'app-insurance-agency-optimization',
    standalone: true,
    templateUrl: './insurance-agency-optimization.component.html',
    styleUrl: './insurance-agency-optimization.component.css',
    imports: [CommonModule, RouterLink, RouterOutlet, SlickCarouselModule, ToolsSectionModule, ourAssetsModule, KnowBestComponent, FaqComponent, CdnUrlDirective, ServiceVimeoComponent, ServiceCaseStudyComponent, ourAssetsComponent]
})
export class InsuranceAgencyOptimizationComponent implements OnInit{
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: "Expert Insurance Optimization Services for P&C Insurance Industry | AOS | FBSPL",
      description:
        "Enhance your P&C insurance operations, optimize workflow, boost lead conversion, and ensure client satisfaction with our agency optimization service.",
      keywords: 'insurance agency optimization, insurance agency consultant',
      ogImage: '/insurance-agency/AOS Banner copy 01.jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
  slides = [
    {
      banner:true,
      img:`${this.cdnUrl}assets/insurance-agency/AOS Banner copy 01.jpg`,
      img_mob:`${this.cdnUrl}assets/insurance-agency/AOS Banner Mobile 1.jpg`,
      Title: 'Insurance Agency Optimization Services  ',
      Description: 'Make smarter decisions and ensure higher ROI with our Agency Optimization Services! Be ready to re-adapt your P&C insurance operations to streamline agency workflows, increase staff efficiency, and minimize agency E&O liability risks. ',
      alt:'Insurance Agency Optimization ',
      Link:"/book-free-consultation-call"
    },
    {
      banner:false,
      img:`${this.cdnUrl}assets/insurance-agency/AOS Banner copy 02.jpg`,
      img_mob:`${this.cdnUrl}assets/insurance-agency/AOS Banner Mobile 2.jpg`,
      Title: 'Transformed Client Service with a 50% Faster Processing ',
      Description:'Up to 90% productivity improvement. 80% streamlined processing. 50% quicker processing. 70% faster policy updates. ',
      Link:"/case-studies",
      fragment:'insurance-agency-optimization-services',
      alt:'Insurance Agency Optimization ',
    },
    {
      banner:false,
      img:`${this.cdnUrl}assets/insurance-agency/AOS Banner copy 03.jpg`,
      img_mob:`${this.cdnUrl}assets/insurance-agency/AOS Banner Mobile 3.jpg`,
      Title: ' Latest Insurtech Trends You Shouldn’t Miss!',
      Description:'Keep your edge in the insurance market. Discover the hottest InsurTech trends that are reshaping the roles of MGAs and wholesalers today. ',
      Link:"/blogs",
      fragment:'',
      alt:'Insurance Agency Optimization ',
    },
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    prevArrow: false,
    nextArrow: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Tablet breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on tablets
          slidesToScroll: 1, // Number of slides to scroll on tablets
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on tablets
          arrows: false // Enable arrows on tablets
        }
      },
      {
        breakpoint: 1024, // Desktop breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on desktops
          slidesToScroll: 1, // Number of slides to scroll on desktops
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on desktops
          arrows: false // Enable arrows on desktops
        }
      },
      {
        breakpoint: 1200, // Desktop breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on desktops
          slidesToScroll: 1, // Number of slides to scroll on desktops
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on desktops
          arrows: false // Enable arrows on desktops
        }
      }
    ]
  };

}
