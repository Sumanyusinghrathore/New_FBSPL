import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import bodymovin from 'lottie-web';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';

import { YoutubeModalComponent } from '../../components/youtube-modal/youtube-modal.component';
import { VimeoPlayerComponent } from '../../components/vimeo-player/vimeo-player.component';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';
import lifefbspl from '../../../assets/Animations/Life @ FBSPL.json';

declare var bootstrap: any;
@Component({
  selector: 'app-life-fbspl',
  templateUrl: './life-fbspl.component.html',
  standalone: true,
  imports: [
    YoutubeModalComponent,
    SlickCarouselModule,
    VimeoPlayerComponent,
    CommonModule,
    CdnUrlDirective,
  ],
  styleUrls: ['./life-fbspl.component.css'],
})
export class LifeFbsplComponent implements OnInit {
  cdnUrl = environment.cdnUrl;
  // @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;
  @ViewChild('iframeWrapper') iframeWrapper!: ElementRef;
  @ViewChild(YoutubeModalComponent) youtubeModal!: YoutubeModalComponent;

  currentVideoUrl!: string;
  currentThumbnail!: string;
  currentalt!: string;

  isMobileView: boolean = true;
  isPopupVisible: boolean = false;

  private bodymovinAnimations: any[] = [];
  slickModal: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Life @ FBSPL | Our Work Culture and Opportunities',
      description:
        'Experience our vibrant office culture, where we keep our employees motivated. Office lunches, outings, workshops, and festival celebrations are all part of FBSPL.',
      keywords: 'work culture, career growth',
      ogImage: '/life@fbspl/Life-at-fbspl_banner.jpg',
    };
    this.seoService.setMetaTags(seoData);
    if (isPlatformBrowser(this.platformId)) {
      this.loadAnimations();
    }
    if (this.videos.length > 0) {
      this.currentVideoUrl = this.videos[0].videoUrl;
      this.currentThumbnail = this.videos[0].thumbnail;
      this.currentalt = this.videos[0].alt;
    }
  }

  private loadAnimations() {
    this.bodymovinAnimations.push(
      bodymovin.loadAnimation({
        container: document.getElementById('lifefbspl') as HTMLElement,
        autoplay: true,
        renderer: 'svg',
        loop: true,
        animationData: lifefbspl,
      })
    );
  }

  slides = [
    {
      double_nverted_icon: `${this.cdnUrl}assets/life@fbspl/CC_FBSPL_VisLan_220424-08.png`,
      text: 'Working at FBSPL has been a transformative experience for me professionally and personally. I have had the opportunity to expand my skillset significantly, and the collaborative work environment has honored my problem-solving abilities.  ',
      name: 'Chetan P Choubey ',
      designation: 'Asst Manager, Marketing Research & Lead Generation ',
    },
    {
      double_nverted_icon: `${this.cdnUrl}assets/life@fbspl/CC_FBSPL_VisLan_220424-08.png`,
      text: " Since joining the company, I've grown a lot professionally. I've moved up from Virtual Assistance to Team Lead, taking on more responsibilities along the way. Learning from my team and diving into new challenges has really helped me progress.",
      name: 'Bahadur Singh Rajput  ',
      designation: 'Team Lead, Operations ',
    },
    {
      double_nverted_icon: `${this.cdnUrl}assets/life@fbspl/CC_FBSPL_VisLan_220424-08.png`,
      text: "I believe that my growth aligns with the company's values and mission, and that my commitment to continuous learning and development will be an asset to the team. FBSPL has offered me the opportunity to learn and tackle new challenges that have helped me grow.  ",
      name: 'Harsh Yadav',
      designation: 'Executive Associate',
    },
    {
      double_nverted_icon: `${this.cdnUrl}assets/life@fbspl/CC_FBSPL_VisLan_220424-08.png`,
      text: 'FBSPL has been a knowledge hub, providing valuable learning experiences that benefit my personal and professional life. At FBSPL, every step of learning unveils a world of endless possibilities, showing that the journey of knowledge is boundless.  ',
      name: 'Rahul Sharma ',
      designation: 'Assistant Manager, Insurance Domain ',
    },
    {
      double_nverted_icon: `${this.cdnUrl}assets/life@fbspl/CC_FBSPL_VisLan_220424-08.png`,
      text: 'FBSPL is more than just a company to me just like my home. Talking about success, I got the opportunity to work with multiple US based clients that have helped me shape my career and enhance my professional skills. ',
      name: 'Mohammed Adnan',
      designation: 'Asst. Team Lead, FLG ',
    },
    {
      double_nverted_icon: `${this.cdnUrl}assets/life@fbspl/CC_FBSPL_VisLan_220424-08.png`,
      text: "Working at FBSPL has been a transformative experience for me. The collaborative environment has significantly enhanced my skills as a Sr. Network & System Administrator. I'm proud to be part of a team that values excellence and continuous improvement.",
      name: 'Rajendra Singh Ranawat ',
      designation: 'Sr. Network & System Administrator, IT ',
    },
  ];
  videos = [
    {
      videoUrl: 'https://player.vimeo.com/video/970760061',
      thumbnail: 'assets/thumbnail-timeless-tales/cpsir.png',
      alt: 'Meet Chetan Prakash Choubey, FBSPL Lead Generation Team',
    },
    {
      videoUrl: 'https://player.vimeo.com/video/970762975',
      thumbnail: 'assets/thumbnail-timeless-tales/bahadursir.png',
      alt: 'Meet Bahadur Singh Rajput, FBSPL Operations Team',
    },
    {
      videoUrl: 'https://player.vimeo.com/video/970765102',
      thumbnail: 'assets/thumbnail-timeless-tales/harshsir.png',
      alt: 'Meet Harsh Yadav, FBSPL Team',
    },
    {
      videoUrl: 'https://player.vimeo.com/video/970772591',
      thumbnail: 'assets/thumbnail-timeless-tales/rahulsir.png',
      alt: 'Meet Rahul Sharma, FBSPL Insurance Team',
    },
    {
      videoUrl: 'https://player.vimeo.com/video/970768982',
      thumbnail: 'assets/thumbnail-timeless-tales/masir.png',
      alt: 'Meet Mohammed Adnan, FBSPL Lead Generation Team',
    },
    {
      videoUrl: 'https://player.vimeo.com/video/970754826',
      thumbnail: 'assets/thumbnail-timeless-tales/rajendrasir.png',
      alt: 'Meet Rajendra Singh Ranawat, FBSPL IT Team',
    },
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipe: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplay: false,
          pauseOnHover: true,
          pauseOnFocus: true,
        },
      },
    ],
  };
  slides1 = [
    {
      img: `${this.cdnUrl}assets/life@fbspl/Learning_Growing_left.png`,
      text_h5: 'Not a Job, But a Journey',
      text_p1: 'Average tenure of our employees exceeds 5 years ',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Learning_Growing_center.png`,
      text_h5: 'Thinking Out of the Box',
      text_p1: 'With diligent efforts we earned 550+ satisfied clients ',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Learning_Growing_right.png`,
      text_h5: 'Pushing the Boundaries',
      text_p1: 'Monthly kudos go out to 13+ standout employees ',
    },
  ];
  slideConfig1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false,
    pauseOnHover: false,
    pauseOnFocus: false,
  };
  Glimpse1 = [
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_1.jpg`,
      alt: ' FBSPL team-building activity',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_2.jpg`,
      alt: 'Group selfie',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_3.jpg`,
      alt: 'FBSPL staff enjoying lunch in the canteen',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_4.jpg`,
      alt: ' Well-furnished FBSPL canteen with employees dining',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_5.jpg`,
      alt: 'Team members brainstorming in a meeting at FBSPL',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_6.jpg`,
      alt: 'FBSPL employees collaborating in the office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_7.jpg`,
      alt: 'FBSPL gym',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_8.jpg`,
      alt: 'FBSPL team celebrating a project success',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_9.jpg`,
      alt: '-FBSPL team in office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_10.jpg`,
      alt: 'Team members working on a project',
    },
  ];
  GlimpseConfig1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
  };
  Glimpse2 = [
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_2.jpg`,
      alt: 'Group selfie',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_3.jpg`,
      alt: 'FBSPL staff enjoying lunch in the canteen',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_4.jpg`,
      alt: 'Well-furnished FBSPL canteen with employees dining',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_5.jpg`,
      alt: 'Team members brainstorming in a meeting at FBSPL',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_6.jpg`,
      alt: 'FBSPL employees collaborating in the office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_7.jpg`,
      alt: 'FBSPL gym',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_8.jpg`,
      alt: 'FBSPL team celebrating a project success',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_9.jpg`,
      alt: '-FBSPL team in office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_10.jpg`,
      alt: 'Team members working on a project',
    },

    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_1.jpg`,
      alt: 'FBSPL team-building activity',
    },
  ];
  GlimpseConfig2 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
  };
  Glimpse3 = [
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_3.jpg`,
      alt: 'FBSPL staff enjoying lunch in the canteen',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_4.jpg`,
      alt: 'Well-furnished FBSPL canteen with employees dining',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_5.jpg`,
      alt: 'Team members brainstorming in a meeting at FBSPL',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_6.jpg`,
      alt: 'FBSPL employees collaborating in the office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_7.jpg`,
      alt: 'FBSPL gym',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_8.jpg`,
      alt: 'FBSPL team celebrating a project success',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_9.jpg`,
      alt: 'FBSPL team in office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_10.jpg`,
      alt: 'Team members working on a project',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_1.jpg`,
      alt: 'FBSPL team-building activity',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_2.jpg`,
      alt: 'Group selfie',
    },
  ];
  GlimpseConfig3 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
  };
  Glimpse4 = [
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_4.jpg`,
      alt: 'Well-furnished FBSPL canteen with employees dining',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_5.jpg`,
      alt: 'Team members brainstorming in a meeting at FBSPL',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_6.jpg`,
      alt: 'FBSPL employees collaborating in the office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_7.jpg`,
      alt: 'FBSPL gym',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_8.jpg`,
      alt: 'FBSPL team celebrating a project success',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_9.jpg`,
      alt: 'FBSPL team in office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_10.jpg`,
      alt: 'Team members working on a project',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_1.jpg`,
      alt: 'FBSPL team-building activity',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_2.jpg`,
      alt: 'Group selfie',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_3.jpg`,
      alt: 'FBSPL staff enjoying lunch in the canteen',
    },
  ];
  GlimpseConfig4 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
  };
  Glimpse5 = [
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_5.jpg`,
      alt: 'Team members brainstorming in a meeting at FBSPL',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_6.jpg`,
      alt: 'FBSPL employees collaborating in the office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_7.jpg`,
      alt: 'FBSPL gym',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_8.jpg`,
      alt: 'FBSPL team celebrating a project success',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_9.jpg`,
      alt: 'FBSPL team in office',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_10.jpg`,
      alt: 'Team members working on a project',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_1.jpg`,
      alt: 'FBSPL team-building activity',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_2.jpg`,
      alt: 'Group selfie',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_3.jpg`,
      alt: 'FBSPL staff enjoying lunch in the canteen',
    },
    {
      img: `${this.cdnUrl}assets/life@fbspl/Image_4.jpg`,
      alt: 'Well-furnished FBSPL canteen with employees dining',
    },
  ];
  GlimpseConfig5 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
  };

  togglePopup(): void {
    if (this.youtubeModal) {
      this.youtubeModal.youtubeUrl = this.currentVideoUrl;
      this.youtubeModal.updateSafeUrl();
      const modalElement = document.getElementById('youtubeModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  frameFreeze(): void {
    this.slickModal.unslick();
    this.slideConfig.autoplay = false;
    setTimeout(() => {
      this.slickModal.initSlick();
    });
  }

  onChange(event: any) {
    const currentSlide = event.currentSlide;
    if (this.videos.length > 0 && currentSlide < this.videos.length) {
      this.currentVideoUrl = this.videos[currentSlide].videoUrl;
      this.currentThumbnail = this.videos[currentSlide].thumbnail;
      this.currentalt = this.videos[currentSlide].alt;

      if (this.iframeWrapper) {
        this.iframeWrapper.nativeElement.classList.remove('zoom-in-out');
        void this.iframeWrapper.nativeElement.offsetWidth;
        this.iframeWrapper.nativeElement.classList.add('zoom-in-out');
      }
    }
  }

  // Method to handle click event and prevent slider from stopping
  handleClick(event: Event) {
    event.stopPropagation(); // Prevent event from bubbling up
  }
}
