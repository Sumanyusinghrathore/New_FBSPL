import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  private baseUrl: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.baseUrl = window.location.origin;
    } else {
      this.baseUrl = ''; // Fallback value if needed for SSR
    }
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
