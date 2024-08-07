import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { TrustedModule } from '../../components/HomeComponents/trustedSlider/trusted.module';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { VimeoPlayerComponent } from '../../components/vimeo-player/vimeo-player.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    TrustedModule,
    RouterLink,
    VimeoPlayerComponent,
    CommonModule,
    CdnUrlDirective,
  ],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit, OnDestroy {
  @ViewChild('AboutVision', { static: false }) AboutVision!: ElementRef;

  currentSection: 'Mission' | 'Vision' | 'Values' = 'Vision';
  private sections: ('Mission' | 'Vision' | 'Values')[] = [
    'Mission',
    'Vision',
    'Values',
  ];
  private sectionIndex = 0;
  private intervalId: any;
  showText = true;

  hideText() {
    this.showText = false;
  }
  constructor(
    private seoService: SeoService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'About FBSPL | Global Business Process Outsourcing & Management',
      description:
        'Get accurate and reliable general ledger accounting services with FBSPL. We specialize in accounting process outsourcing and management. Contact us today.',
      keywords: 'business process outsourcing, outsourcing business',
      ogImage: '/meta/about.jpg',
    };

    this.seoService.setMetaTags(seoData);
    this.startSectionRotation();
  }

  ngOnDestroy(): void {
    this.clearSectionRotation();
  }

  setSection(section: 'Mission' | 'Vision' | 'Values') {
    this.currentSection = section;
  }
  setSectiononClick(section: 'Mission' | 'Vision' | 'Values') {
    if (isPlatformBrowser(this.platformId)) {
      const isMobileView = window.innerWidth <= 768;

      if (isMobileView) {
        this.AboutVision.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          top: '-20',
        });
      }
    }

    this.currentSection = section;
  }
  private startSectionRotation(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          if (this.sections[this.sectionIndex] !== undefined) {
            this.setSection(this.sections[this.sectionIndex]);
            this.sectionIndex = (this.sectionIndex + 1) % this.sections.length;
          } else {
            this.clearSectionRotation();
          }
        });
      }, 4000);
    });
  }

  private clearSectionRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
