import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SeoService } from '../../../services/seo/seo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SeoData } from '../../../services/seo/seo-data.model';
import { FaqComponent } from '../../../components/HomeComponents/faq/faq.component';
import { ServiceCaseStudyComponent } from '../../../components/HomeComponents/service-case-study/service-case-study.component';
import { KnowBestComponent } from '../../../components/HomeComponents/know-best/know-best.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
import { environment } from '../../../../environments/environment';
import { ourAssetsComponent } from "../../../components/HomeComponents/ourAssets/ourAssets.component";
@Component({
  selector: 'app-customer-support',
  standalone: true,
  templateUrl: './customer-support.component.html',
  styleUrl: './customer-support.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    FaqComponent,
    ServiceCaseStudyComponent,
    KnowBestComponent,
    CdnUrlDirective,
    ourAssetsComponent
],
})
export class CustomerSupportComponent implements OnInit {
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService, private router: Router) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Customer Support Outsourcing & Management',
      description:
        'Upgrade your business with FBSPL customer support outsourcing & management to boost customer retention, loyalty & engagement. Empower your brand today!',
      keywords: 'customer support outsourcing, customer support management',
      ogImage: '/Customer Support/Banner/Banner Customer Support 1.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }
  slides = [
    {
      banner: true,
      img: `${this.cdnUrl}assets/Customer Support/Banner/Banner Customer Support 1.jpg`,
      img_mob: `${this.cdnUrl}assets/Customer Support/Banner/Mobile-banner1.jpg`,
      Title: 'Customer Support Services-Answering the Why',
      Description:
        "Befriending your customers. Building trust and brand reputation with every interaction. Sign up for our best-in-class processes and technologies that help you eliminate critical points of friction, gain deeper insights into your customer's needs, and predict their future needs.",
      customersupport: 'Sign Up Now',
      Link: '/book-free-consultation-call',
      alt:'Customer Support Services '
    },

    {
      banner: true,
      img: `${this.cdnUrl}assets/Customer Support/Banner/Banner Customer Support 2.jpg`,
      img_mob: `${this.cdnUrl}assets/Customer Support/Banner/Mobile-banner2.jpg`,
      Title: 'How Psychology Affects the Voice Support Customer Experience ',
      Description:
        "Learn how understanding customers'psychology helps you offer them a more personalized experience and build stronger relationships.",
      customersupport: 'Begin Here',
      Link: '/case-studies#customerSupport',
      alt:'Read about our Customized Customer Support Service-Case Study '
    },
    {
      banner: true,
      img: `${this.cdnUrl}assets/Customer Support/Banner/Banner Customer Support 3.jpg`,
      img_mob: `${this.cdnUrl}assets/Customer Support/Banner/Mobile-banner3.jpg`,
      Title:
        'Customer ticketing and Server Management optimization with FBSPL ',
      Description:
        'Improved efficiency, maintained 24/7 availability, optimized ticketing platform, and more. ',
      customersupport: 'Learn Here',
      Link: '/blogs#customerSupport',
      alt:'Latest Industry News & Blogs-Customer Support '
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
          arrows: true, // Enable arrows on tablets
        },
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
          arrows: false, // Enable arrows on desktops
        },
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
          arrows: false, // Enable arrows on desktops
        },
      },
    ],
  };
}
