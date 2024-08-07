import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { FaqModule } from '../../components/HomeComponents/faq/faq.module';
import { ourAssetsModule } from '../../components/HomeComponents/ourAssets/ourAssets.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SeoService } from '../../services/seo/seo.service';
import { ToolsSectionModule } from '../../components/ServiceComponent/ToolsSection/ToolsSection.module';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    FaqModule,
    ourAssetsModule,
    ToolsSectionModule,
    SlickCarouselModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  slides = [
    {
      img: '../../../assets/Service-slider/Insurance Slider Image 01 1.png',
      Title: 'Insurance Outsourcing Services',
      Descrition:
        'Deliver value beyond policies. Connect with us for customer-centric insurance outsourcing services. From policy processing to claims management, we master it all! ',
        Link: ''
      },
    {
      img: '../../../assets/Service-slider/Insurance Slider Image 02 1.png',
      Title: 'Case Study',
      Descrition:
        'Witness the business transformation of our potential clients. Explore the significant impact on more than a thousand insurance agents, and businesses. ',
        Link: ''
    },
    {
      img: '../../../assets/Service-slider/Insurance Slider Image 03 1.png',
      Title: 'Know What’s Trending in Insurance',
      Descrition:
        'Stay ahead in the competitive insurance landscape! Discover the latest trends shaping the insurance industry, current market analysis, and more, to uncover opportunities for growth. ',
      Link: '',
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
  };

  slidesmob = [
    {
      img: '../../../assets/Service-slider/Insurance Slider ImageMob 01 5.png',
      Heading: 'Home > Services > Insurance',
      Title: 'Insurance Outsourcing Services with Specialized Expertise',
      Descrition:
        'Deliver value beyond policies. Connect with us for customer-centric insurance outsourcing services. From policy processing to claims management, we master it all! ',
      Link: '',
    },
    {
      img: '../../../assets/Service-slider/Insurance Slider ImageMob 02 2.png',
      Heading: 'Home > Services > Insurance',
      Title: 'Case Study',
      Descrition:
        'Witness the business transformation of our clients into their finest selves. Explore the significant impact on more than a thousand insurance agents, and businesses. ',
      Link: '',
    },
    {
      img: '../../../assets/Service-slider/Insurance Slider ImageMob 03 2.png',
      Heading: 'Home > Services > Insurance',
      Title: 'Know What’s Trending in Insurance',
      Descrition:
        'Stay ahead in the competitive insurance landscape! Discover the latest trends shaping the insurance industry, current market analysis, and more to uncover opportunities for growth. ',
      Link: '',
    },
  ];
   slideConfigMob = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
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
          autoplay: false,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on tablets
          arrows: true // Enable arrows on tablets
        }
      },
      {
        breakpoint: 1024, // Desktop breakpoint
        settings: {
          slidesToShow: 1, // Number of slides to show on desktops
          slidesToScroll: 1, // Number of slides to scroll on desktops
          autoplay: false,
          prevArrow: false,
          nextArrow: false,
          dots: false, // Enable dots on desktops
          arrows: true // Enable arrows on desktops
        }
      }
    ]
  };
  

  constructor(private seoService: SeoService) {
    const content =
      ' It applies Routing, Lazy loading and Progressive Web App (PWA)';

    const title = 'angular-starter Title : Home Page';

    this.seoService.setMetaDescription(content);
    this.seoService.setMetaTitle(title);
  }
}
