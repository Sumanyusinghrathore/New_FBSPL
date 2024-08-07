import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { VimeoPlayerComponent } from '../../components/vimeo-player/vimeo-player.component';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    SlickCarouselModule,
    VimeoPlayerComponent,
    CdnUrlDirective,
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
  cdnUrl = environment.cdnUrl;
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'FBSPL Client Testimonials | Real Stories, Real Results',
      description:
        'Hear from our clients about their experiences with FBSPL and how our commitment to provide error-free service contributes to their success and satisfaction, and what sets us apart.',
      keywords: 'client testimonials, client review, client stories',
      ogImage: '/testimonial/TestimonialsBanner.jpg',
    };
    this.seoService.setMetaTags(seoData);
  }

  videos = [
    {
      videoUrl: 'https://player.vimeo.com/video/962238538',
      thumbnail:
        'assets/Testimonials/client-testimonial/Client Testimonials YT 07 Stacey DiSpigno copy.webp',
      alt: 'Listen to our success stories',
    },
    {
      videoUrl: 'https://player.vimeo.com/video/963295022',
      thumbnail:
        'assets/Testimonials/client-testimonial/Client Testimonials YT 03 Joey Cumley.webp',
      alt: "Hear m our client highlighting satisfaction with FBSPL's work",
    },
    {
      videoUrl: 'https://player.vimeo.com/video/969702390',
      thumbnail:
        'assets/Testimonials/client-testimonial/Client Testimonials YT 01 Chin Ma.webp',
      alt: 'Our client talking about how FBSPL makes a difference',
    },
  ];

  testimonial_slide = [
    {
      img: `${this.cdnUrl}assets/Testimonials/client-testimonial/Chin Ma.jpg`,
      description:
        " I must say that our partnership with Fusion Business Solutions (FBSPL) has been truly exceptional. What sets FBSPL apart is their remarkable ability to not only grasp our ever-evolving business needs but also their genuine curiosity to understand our culture. Their flexibility and agility have been invaluable. FBSPL's proactive approach, coupled with their rigorous processes and scalability, has significantly enhanced our customer experiences and AI operations. ",
      Name: 'Chin Ma',
      Title: 'Founder & President',
      alt: 'Hear from our client about FBSPL services',
    },
    {
      img: `${this.cdnUrl}assets/Testimonials/client-testimonial/Isom.jpg`,
      description:
        "Fusion Business Solutions has been a game-changer for our company. Their responsive team, seamless onboarding, and commitment to excellence have significantly reduced our stress levels, allowing us to focus on what matters most – our clients. We've experienced measurable improvements in client retention and employee satisfaction since partnering with Fusion, making them the top choice for any business seeking efficient virtual assistant services. ",
      Name: 'Isom Rigell M. Ed.',
      Title: 'Chief People Officer',
      alt: 'Read review from our happy client',
    },
    {
      img: `${this.cdnUrl}assets/Testimonials/client-testimonial/Joey Cumley.jpg`,
      description:
        'We have had an incredible experience with fusion so far. We have actually increased our fusion team size twice now. And the process has been very seamless, very easy. The fusion team is very communicative, and the quality of the work has rivaled that of any employee we could have in-house.',
      Name: 'Joey Cumley',
      Title: 'Chief Merchandising Officer',
      alt: 'Client review on our BPO & BPM services',
    },
    {
      img: `${this.cdnUrl}assets/Testimonials/client-testimonial/james oickle.jpg`,
      description:
        'We reached out to Fusion in the Fall of 2022 as we were having issues recruiting a skilled and motivated workforce locally to fill back-office roles in our organization. What started as a simple documentation validation exercise quickly grew into the team supporting more strategic review and reconciliation activities. The team has shown repeatedly that they are willing to take on more and more complicated tasks, and the leadership team is quick to rally and support their employees when things fall off track.  ',
      Name: 'James Oickle',
      Title: 'President & CEO',
      alt: 'Hear about outsourcing services',
    },
    {
      img: `${this.cdnUrl}assets/Testimonials/client-testimonial/francesca.jpg`,
      description:
        'FBSPL transformed our operations quickly. Their exceptional administrative support, bookkeeping, and recruiting services significantly improved our processes and boosted lead conversion rates. Their integrity, professionalism, and tailored approach set them apart, making them valuable partners in our growth.  ',
      Name: 'Francesca Furlanetto',
      Title: 'Director Owner',
      alt: 'Client expressing appreciation for our work',
    },
    {
      img: `${this.cdnUrl}assets/Testimonials/client-testimonial/Monica.jpg`,
      description:
        'As the Director of Accounting for an E&S Insurance Company, I connected with FBSPL to support our monthly manual processes. Their team has been a game-changer, enabling us to meet deadlines and improve workflows. The team quickly adapted and delivered high-quality work with over 95% accuracy. Their dedication and service-oriented approach have been invaluable to our growing company.',
      Name: 'Monica Spivey',
      Title: 'Directory of Accounting',
      alt: 'Client praising FBSPL',
    },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-prev privious_class">Previous</button>',
    nextArrow:
      '<button type="button" class="slick-next next_class">Next</button>',
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          arrows: false,
          dots: true,
        },
      },
    ],
  };
}
