import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Directive({
  selector: '[appCdnUrl]',
  standalone: true,
})
export class CdnUrlDirective implements OnInit {
  @Input('appCdnUrl') path: string | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const cdnUrl = environment.cdnUrl;
    this.el.nativeElement.src = `${cdnUrl}${this.path}`;
  }
}
