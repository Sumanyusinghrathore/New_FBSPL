import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeModalComponent } from '../../youtube-modal/youtube-modal.component';
import { VimeoPlayerComponent } from '../../vimeo-player/vimeo-player.component';
import { CdnUrlDirective } from '../../../directives/cdn-url.directive';
declare var bootstrap: any;
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-know-best',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    VimeoPlayerComponent,
    YoutubeModalComponent,
    CdnUrlDirective,
  ],
  templateUrl: './know-best.component.html',
  styleUrl: './know-best.component.css',
})
export class KnowBestComponent {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;
  @ViewChild('iframeWrapper') iframeWrapper!: ElementRef;
  @ViewChild(YoutubeModalComponent) youtubeModal!: YoutubeModalComponent;
  @Input() cards: any[] = [];
  @Input() videos: any[] = [];

  currentVideoUrl!: string;
  currentThumbnail!: string;
  currentalt!:string;

  isMobileView: boolean = true;
  isPopupVisible: boolean = false;
  cdnUrl = environment.cdnUrl;
  constructor(public sanitizer: DomSanitizer) {}

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    arrow: false,
  };

  ngOnInit() {
    if (this.videos.length > 0) {
      this.currentVideoUrl = this.videos[0].videoUrl;
      this.currentThumbnail = this.videos[0].thumbnail;
      this.currentalt = this.videos[0].alt;
    }
  }
  togglePopup(videoUrl: string): void {
    if (this.youtubeModal) {
      this.youtubeModal.youtubeUrl = videoUrl;
      this.youtubeModal.updateSafeUrl();
      const modalElement = document.getElementById('youtubeModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  onAfterChange(event: any) {
    if (this.videos.length > 0) {
      this.currentVideoUrl = this.videos[event.currentSlide].videoUrl;
      this.currentThumbnail = this.videos[event.currentSlide].thumbnail;
      this.currentalt = this.videos[event.currentSlide].alt;

      if (this.iframeWrapper) {
        this.iframeWrapper.nativeElement.classList.remove('zoom-in-out');
        void this.iframeWrapper.nativeElement.offsetWidth;
        this.iframeWrapper.nativeElement.classList.add('zoom-in-out');
      }
    }
  }
}
