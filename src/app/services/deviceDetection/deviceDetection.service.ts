import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  private mobileWidth: number = 767;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  isMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth <= this.mobileWidth;
    }
    return false;
  }
}
