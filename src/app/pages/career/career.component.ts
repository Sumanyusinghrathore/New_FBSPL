import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  Inject,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SeoData } from '../../services/seo/seo-data.model';
import { SeoService } from '../../services/seo/seo.service';
import { FaqComponent } from '../../components/HomeComponents/faq/faq.component';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterLink,
    RouterOutlet,
    FaqComponent,
    CdnUrlDirective,
  ],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})
export class CareerComponent implements AfterViewInit, OnInit {
  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    }
    const seoData: SeoData = {
      title: 'Careers at FBSPL | More Than Just A Workplace',
      description:
        'Be part of a Great Place to Work-certified team. Find exciting career opportunities at FBSPL and start your professional journey now.',
      keywords: 'career opportunities',
      ogImage: '/Career/Career_Banner_desktop.png',
    };
    this.seoService.setMetaTags(seoData);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.counters();
      this.accordian();
    }
  }

  Greater_Purpose = [
    { target: 98, text: 'Employees continue their journey with us' },
    { target: 50, text: 'Of our workforce is composed of women' },
    { target: 100, text: 'In total employees undergoes L&D training' },
    { target: 90, text: 'Employees work in a great place to work location' },
  ];

  Greater_PurposeConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  Inspired = [
    {
      imgSrc: `${environment.cdnUrl}assets/Career/Happiness.svg`,
      class: 'Happiness',
      alt: 'Happiness Image',
      title: 'Happiness',
      text: 'Putting a smile out there',
    },
    {
      imgSrc: `${environment.cdnUrl}assets/Career/ContinuousLearning.svg`,
      class: 'Continuous_Learning',
      alt: 'Continuous Learning',
      title: 'Continuous Learning',
      text: 'Planting the seeds of future',
    },
    {
      imgSrc: `${environment.cdnUrl}assets/Career/collaboration.svg`,
      class: 'Collaboration',
      alt: 'Collaboration',
      title: 'Collaboration',
      text: 'Achieving more together',
    },
    {
      imgSrc: `${environment.cdnUrl}assets/Career/integrity.svg`,
      class: 'Integrity',
      alt: 'Integrity',
      title: 'Integrity',
      text: 'Upholding transparency in actions',
    },
  ];

  InspiredConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  employe = [
    {
      description:
        "Working at this company has been an incredible journey for me. The supportive environment and professional development opportunities have really helped me grow in my career. I've learned so much from my colleagues and managers, and I feel like my skills have been valued and recognized. I'm excited to continue my journey with FBSPL. ",
      name: 'Dharmdeep Tater ',
      title: 'Senior Software Eng.',
    },
    {
      description:
        "My initial plan was to stay with FBSPL for just 2 years, but now I am in my 16th year here. The strong ethics, clear vision, and trust from management have made this journey impactful. I have got the freedom to showcase my capabilities to perform better. Manifesting, while merging my dream with FBSPL's vision to look back after a few years on how this has helped fulfill each other dreams. ",
      name: 'Chetan Prakash Choubey',
      title: 'Asst. Manager - Lead Gen & Market Research',
    },
    {
      description:
        'Joining the FBSPL two years ago as an Admin Associate has been one of the most rewarding decisions of my career. From day one, I was welcomed into a supportive and dynamic work environment that truly values its employees. The company recognized my hard work and dedication while offering a scope of continuous learning and growth. I am blessed to be a part of such an innovative and forward-thinking organization.',
      name: 'Manisha Dave',
      title: 'Assistant Manager- Admin',
    },
    {
      description:
        "My three-year journey with FBSPL was filled with pride and accomplishment. The journey commenced with a period of immersion and learning. During the initial months, I dedicated myself to understanding the company's vision, mission, and values while familiarizing myself with its operations, processes, and culture.",
      name: 'Akshay Kumar ',
      title: 'Executive Associate – Operations',
    },
    {
      description:
        'My journey at FBSPL has been nothing short of remarkable! I started my career at FBSPL as an Associate in 2021. Gradually, I got an opportunity to prove my potential in the Learning and Development department as a Communication Trainer in 2022. With the scope and exposure that the company provides to every member, I got promoted to Management Trainer. ',
      name: 'Yesha Shukla',
      title: 'Management Trainer',
    },
    {
      description:
        "I've had a wonderful experience with FBSPL. What I appreciate most about it are the conducive work environment, the open platform for engaging with top leadership, and the ample opportunities for learning and growth. ",
      name: 'Rahul Dangi',
      title: 'Junior Manager - HR',
    },
    {
      description:
        "My journey with FBSPL over the past 15 years has been truly amazing. I started as a junior technician and have grown and developed my skills, leading to my current position as an assistant networking manager. The continuous support and opportunities provided by FBSPL have been instrumental in my career progression. I am grateful for the experiences and look forward to contributing further to the company's success.",
      name: 'Rajendra Singh',
      title: 'Senior System and Network administrator',
    },
    {
      description:
        'I currently work as an assistant manager in the insurance department at FBSPL. My journey with FBSPL began in May 2011, when I joined as a Trainee Associate. Over the years, I have had the privilege of learning extensively from my seniors and colleagues. FBSPL is not just a workplace for me; it is a place where one can learn, grow, and look forward to a promising future. ',
      name: 'Pushpendra Singh Rathore ',
      title: 'Asst. Manager- Insurance',
    },
    {
      description:
        "I have been working here for 7 great years, learning heaps about life. Starting as an associate and now an assistant team lead in sales and marketing, it's been a journey of personal and professional growth. The environment of constant learning and supportive mentorship has truly shaped me into who I am today. FBSPL isn't just a workplace; it's a place where growth is nurtured, and individuals thrive. ",
      name: 'Avadhesh Sharma',
      title: 'Asst. Team Lead - Sales & Marketing',
    },
    {
      description:
        "My experience at FBSPL has been truly enriching. As a part of a dynamic team, I've had the opportunity to manage multiple projects, enhance client relations, and drive process improvements. The company's supportive and collective culture has made my journey here not just rewarding, but also a testament to FBSPL's dedication to our growth and development.",
      name: 'Divya Babel ',
      title: 'AGM - Finance',
    },
  ];

  employeConfig = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  private accordian(): void {
    const choiceArray = document.querySelectorAll('.choice_accordion');
    if (choiceArray.length > 0) {
      choiceArray.forEach((card) => {
        card.addEventListener('click', () => {
          choiceArray.forEach((element) => {
            element.classList.remove('expand', 'unset', 'small');
            element.classList.add('small');
          });
          card.classList.remove('small');
          card.classList.add('expand');
        });
      });
    }
  }

  private counters(): void {
    const counters = this.document.querySelectorAll<HTMLDivElement>('.counter');
    if (counters.length > 0) {
      counters.forEach((counter: Element) => {
        const counterElement = counter as HTMLDivElement; // Type assertion
        counterElement.innerText = '0';
        const updateCounter = () => {
          const target = Number(counterElement.getAttribute('data-target'));
          const count = Number(counterElement.innerText);
          const increment = target / 200;
          if (count < target) {
            counterElement.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(updateCounter, 30);
          } else {
            // If the target is reached or exceeded, set the counter to the target value
            counterElement.innerText = target.toString();
          }
        };
        updateCounter(); // Ensure the counter update function is called
      });
    } else {
      console.warn('No counters found with the selector .counter');
    }
  }
}
