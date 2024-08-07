import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ourAssetsModule } from '../../../components/HomeComponents/ourAssets/ourAssets.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SeoService } from '../../../services/seo/seo.service';
import { ToolsSectionModule } from '../../../components/ServiceComponent/ToolsSection/ToolsSection.module';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { ServiceVimeoComponent } from "../../../components/HomeComponents/service-vimeo/service-vimeo.component";
import { ServiceCaseStudyComponent } from "../../../components/HomeComponents/service-case-study/service-case-study.component";
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { ourAssetsComponent } from "../../../components/HomeComponents/ourAssets/ourAssets.component";
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-services',
    standalone: true,
    templateUrl: './services.component.html',
    styleUrl: './services.component.css',
    imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    ourAssetsModule,
    ToolsSectionModule,
    SlickCarouselModule,
    FaqComponent,
    ServiceVimeoComponent,
    ServiceCaseStudyComponent, KnowBestComponent,
    ourAssetsComponent,CdnUrlDirective
]
})
export class ServicesComponent implements OnInit{
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) { }
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Outsource Ecommerce Support Services - Partner with FBSPL',
      description:
        "Explore tailored e-Commerce Outsourcing Services for your online store. Partner with us to streamline operations, enhance customer satisfaction, manage catalogs, customer service, data, orders, and more.",
      keywords: 'ecommerce outsourcing services, ecommerce outsourcing support',
      ogImage:'/E-commerce/Ecommerce Slider Image 01 (1).jpg'
    };
    this.seoService.setMetaTags(seoData);
  }
  slides = [
    {
      banner:true,
      img:`${this.cdnUrl}assets/E-commerce/Ecommerce Slider Image 01 (1).jpg `,
      img_mob:`${this.cdnUrl}assets/E-commerce/Mobile-banner11 (1).jpg`,
      Title: 'Respond Promptly to Your E-commerce Outsourcing Complexities ',
      Description:
      `
Leverage the best of technology with our comprehensive E-commerce outsourcing services. From expert pre-sales consultations to inventory management, we offer customized solutions best-fitted for your business needs.
  `,
      Ecommerce: 'Talk to our experts',
      Link:"/book-free-consultation-call",
      alt:'eCommerce Management Services '
      
    },
    {
      banner:false,
      img:`${this.cdnUrl}assets/E-commerce/Ecommerce Slider Image 02.jpg`,
      img_mob:`${this.cdnUrl}assets/E-commerce/Mobile-banner2.jpg`,
      Title: 'Revolutionizing E-commerce Brand with Fulfillment and Inventory Excellence  ',
      Description:
      'The collaboration led to significant improvements in sales, customer satisfaction, and operational efficiency. ',
      Ecommerce: 'Talk to our experts',
      Link:"/case-studies#ecommerce",
      alt:'Read How We Revolutionize eCommerce Brands-Case Study '
    },
    {
      banner:false,
      img:`${this.cdnUrl}assets/E-commerce/Ecom banner 1.jpg`,
      img_mob:`${this.cdnUrl}assets/E-commerce/Mobile-banner-1.png`,
      Title: 'Master the Art of Crafting E-commerce Product Descriptions That Make Customers Click "Add to Cart"',
      Description: "Read this blog to learn how to write product descriptions that address your customers' biggest pain points and compel them to click on the 'Buy' button.",
      Ecommerce: 'Talk to our experts',
      Link:"/blogs#ecommerce",
      alt:'eCommerce News & Blogs'
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
