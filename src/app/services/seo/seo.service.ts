import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from './seo-data.model';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  private cdnUrl = environment.cdnUrl;
  BASE_URL = 'https://www.fbspl.com';
  DefaultMetaImgUrl = `${this.cdnUrl}assets/Logo/Logo.png`;
  // Set the meta description tag
  public setMetaDescription(content: string) {
    this.updateMetaTag('name', 'description', content);
  }

  // Set the title tag
  public setMetaTitle(title: string) {
    this.titleService.setTitle(title);
  }

  // Set multiple meta tags based on the provided SeoData object
  public setMetaTags(seoData: SeoData) {
    if (seoData.title) {
      this.setMetaTitle(seoData.title);
    }
    if (seoData.description) {
      this.setMetaDescription(seoData.description);
    }
    if (seoData.keywords) {
      this.setMetaKeywords(seoData.keywords);
    }
    if (seoData.ogTitle) {
      this.setOgTitle(seoData.ogTitle);
    }
    if (seoData.ogDescription) {
      this.setOgDescription(seoData.ogDescription);
    }
    if (seoData.ogImage) {
      const imgUrl = `${this.cdnUrl}assets${seoData.ogImage}`;
      this.setOgImage(imgUrl);
    } else {
      this.setOgImage(this.DefaultMetaImgUrl);
    }
    if (seoData.canonicalUrl) {
      this.setCanonicalUrl(`${this.BASE_URL}${seoData.canonicalUrl}`);
    } else {
      this.setCanonicalUrl(`${this.BASE_URL}${this.router.url}`);
    }
    if (seoData.author) {
      this.setAuthor(seoData.author);
    }
  }

  // Set the meta keywords tag
  private setMetaKeywords(keywords: string) {
    this.updateMetaTag('name', 'keywords', keywords);
  }

  // Set the Open Graph title tag
  private setOgTitle(ogTitle: string) {
    this.updateMetaTag('property', 'og:title', ogTitle);
  }

  // Set the Open Graph description tag
  private setOgDescription(ogDescription: string) {
    this.updateMetaTag('property', 'og:description', ogDescription);
  }

  // Set the Open Graph image tag
  private setOgImage(ogImage: string) {
    this.updateMetaTag('property', 'og:image', ogImage);
  }

  // Set the canonical URL tag
  private setCanonicalUrl(url: string) {
    if (isPlatformBrowser(this.platformId)) {
      const link: HTMLLinkElement =
        document.querySelector("link[rel='canonical']") ||
        document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
  }

  // Set the author meta tag
  private setAuthor(author: string) {
    this.updateMetaTag('name', 'author', author);
  }

  // Helper method to update or create meta tags
  private updateMetaTag(
    attributeName: string,
    attributeValue: string,
    content: string
  ) {
    const tag = this.meta.getTag(`${attributeName}="${attributeValue}"`);
    if (tag) {
      this.meta.updateTag({
        [attributeName]: attributeValue,
        content: content,
      });
    } else {
      this.meta.addTag({ [attributeName]: attributeValue, content: content });
    }
  }
}
