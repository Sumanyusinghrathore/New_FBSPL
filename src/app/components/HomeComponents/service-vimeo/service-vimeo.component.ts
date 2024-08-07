import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VimeoPlayerComponent } from '../../vimeo-player/vimeo-player.component';

@Component({
  selector: 'app-service-vimeo',
  standalone: true,
  imports: [VimeoPlayerComponent, CommonModule],
  templateUrl: './service-vimeo.component.html',
  styleUrls: ['./service-vimeo.component.css'],
})
export class ServiceVimeoComponent implements OnInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;
  @ViewChild('iframeWrapper') iframeWrapper!: ElementRef;
  @Input() videos: any[] = [];

  currentVideoUrl!: string;
  sanitizedVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.videos && this.videos.length > 0) {
      this.currentVideoUrl = this.videos[0].videoUrl;
      this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.currentVideoUrl
      );
    }
  }
}
