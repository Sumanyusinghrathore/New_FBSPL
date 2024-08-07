import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vimeo-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vimeo-player.component.html',
  styleUrl: './vimeo-player.component.css',
})
export class VimeoPlayerComponent {
  @Input() useWhitePlayButton: boolean = false;
  @Input() videoUrl!: string;
  @Input() thumbnail!: string;
  @Input() alt!: string;
  @ViewChild('videoPlayer', { static: true })
  videoPlayer!: ElementRef<HTMLIFrameElement>;
  public safeVideoUrl!: SafeResourceUrl;
  public showOverlay: boolean = true;
  cdnThumbnail: string | undefined;
  cdnUrl = environment.cdnUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    // Sanitize the video URL
    if (this.videoUrl) {
      const videoUrl = `${this.videoUrl}?badge=0&autopause=1&title=0&byline=0&portrait=0&player_id=0&app_id=58479`;
      this.safeVideoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
    this.showOverlay = true;
    this.cdnThumbnail = `${this.cdnUrl}${this.thumbnail}`;
  }

  playVideo() {
    this.showOverlay = false;
    const iframe = this.videoPlayer.nativeElement;
    const src = `${iframe.src}?autoplay=1`;
    iframe.src = src;
  }
  // get playButtonImage(): string {
  //   return this.useWhitePlayButton
  //     ? '../../../assets/Icon/white-playicon.svg'
  //     : '../../../assets/Icon/blue-playicon.svg';
  // }
}
