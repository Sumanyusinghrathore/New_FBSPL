import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-youtube-modal',
  standalone: true,
  templateUrl: './youtube-modal.component.html',
  styleUrls: ['./youtube-modal.component.css'],
  imports: [CommonModule],
})
export class YoutubeModalComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() youtubeUrl: string = '';
  safeUrl?: SafeResourceUrl;
  private modalElement: HTMLElement | null = null;
  private shownListener: (() => void) | undefined;
  private hiddenListener: (() => void) | undefined;
  private isBrowser: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges() {
    this.updateSafeUrl();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.modalElement = document.getElementById('youtubeModal');
      if (this.modalElement) {
        this.shownListener = this.renderer.listen(
          this.modalElement,
          'shown.bs.modal',
          this.onModalShown.bind(this)
        );
        this.hiddenListener = this.renderer.listen(
          this.modalElement,
          'hidden.bs.modal',
          this.onModalHidden.bind(this)
        );
      }
    }
  }

  ngOnDestroy() {
    if (this.shownListener) {
      this.shownListener();
    }
    if (this.hiddenListener) {
      this.hiddenListener();
    }
  }

  onModalShown() {
    this.updateSafeUrl();
  }

  onModalHidden() {
    this.onClose();
  }

  updateSafeUrl() {
    if (this.youtubeUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.youtubeUrl
      );
    } else {
      this.safeUrl = undefined;
    }
  }

  onClose() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }
}
