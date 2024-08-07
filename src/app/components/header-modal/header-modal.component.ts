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
  selector: 'app-header-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-modal.component.html',
  styleUrl: './header-modal.component.css',
})
export class HeaderModalComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() headerUrl: string = '';
  safeUrl?: SafeResourceUrl;
  private modalElement: HTMLElement | null = null;
  private shownListener: (() => void) | undefined;
  private hiddenListener: (() => void) | undefined;
  private isBrowser: boolean;
  public safeVideoUrl?: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges() {
    this.updateSafeUrl();
    if (this.headerUrl) {
      const headerUrl = `${this.headerUrl}?badge=0&autopause=1&title=0&byline=0&portrait=0&player_id=0&app_id=58479`;
      this.safeVideoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(headerUrl);
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.modalElement = document.getElementById('headerModal');
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
    if (this.headerUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.headerUrl
      );
    } else {
      this.safeUrl = undefined;
    }
  }

  onClose() {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }
}
