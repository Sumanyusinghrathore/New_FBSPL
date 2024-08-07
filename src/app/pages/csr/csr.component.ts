import {
  Component,
  AfterViewInit,
  OnInit,
  Inject,
  QueryList,
  HostListener,
  ViewChildren,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import bodymovin from 'lottie-web';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import { environment } from '../../../environments/environment';
import aminationFile from '../../../assets/Animations/CSR Page.json';
declare var $: any;
@Component({
  selector: 'app-csr',
  standalone: true,
  imports: [CommonModule, RouterLink, SlickCarouselModule, CdnUrlDirective],
  templateUrl: './csr.component.html',
  styleUrl: './csr.component.css',
})
export class CSRComponent implements OnInit, AfterViewInit {
  @ViewChildren('starCanvas1, starCanvas2, starCanvas3, starCanvas4')
  canvasElements!: QueryList<ElementRef<HTMLCanvasElement>>;

  private FPS = 60;
  private mouse = { x: 0, y: 0 };
  private maxStars = 50;

  private stars: any[][] = [];
  private animationFrames: number[] = [];
  @ViewChild('slickSlider')
  slickSlider!: ElementRef;
  images: HTMLImageElement[] = [];
  imageURLs: string[] = [];
  currentImageIndex: number = 0;
  constructor(
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'FBSPL CSR Initiatives | Committed to Social Responsibility',
      description:
        "Learn about FBSPL's CSR initiatives. We are committed to community development, sustainability, and social well-being through impactful and dedicated efforts.",
      keywords: 'csr, corporate social responsibilities',
      ogImage: '/meta/CSR.jpg',
    };
    this.seoService.setMetaTags(seoData);
    setTimeout(() => {
      this.changeImages();
    }, 1000);
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Animation initialization code
      const animationInline1 = bodymovin.loadAnimation({
        container: document.getElementById('animationCSR') as HTMLElement,
        autoplay: true,
        renderer: 'svg',
        loop: true,
        animationData: aminationFile,
      });
      this.accordian();
      this.images = [
        ...Array.from(
          document.querySelectorAll(
            '.imageChange img'
          ) as NodeListOf<HTMLImageElement>
        ),
      ];
    }

    this.imageURLs = Array.from(this.images).map((e) => e.src);

    this.shuffleArray(this.imageURLs);

    this.currentImageIndex = Math.floor(Math.random() * this.imageURLs.length);
    this.images[this.currentImageIndex]?.classList.add('fade');
    this.images[this.currentImageIndex].src =
      this.imageURLs[this.currentImageIndex];
    setInterval(() => this.changeImage(), 200);
    this.canvasElements.forEach((canvasRef, index) => {
      this.setupStarCanvas(canvasRef.nativeElement, index);
    });
  }

  changeImage(): void {
    this.shuffleArray(this.imageURLs);

    this.images[this.currentImageIndex].classList.remove('fade');
    this.images[this.currentImageIndex].classList.add('fade');

    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

    this.images[this.currentImageIndex].src =
      this.imageURLs[this.currentImageIndex];

    this.images[this.currentImageIndex].classList.remove('fade');
    this.images[this.currentImageIndex].classList.add('fade');
  }

  shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private setupStarCanvas(canvas: HTMLCanvasElement, index: number): void {
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.stars[index] = [];
    this.populateStars(canvas, index);
    this.animate(canvas, ctx, index);
  }

  private populateStars(canvas: HTMLCanvasElement, index: number): void {
    this.maxStars = window.innerWidth <= 768 ? 20 : 150;
    const maxRadius = window.innerWidth <= 768 ? 2 : 5;
    for (let i = 0; i < this.maxStars; i++) {
      this.stars[index].push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: maxRadius + 1,
        vx: Math.floor(Math.random() * 100) - 50,
        vy: Math.floor(Math.random() * 100) - 50,
      });
    }
  }

  private drawStars(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    index: number
  ): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 1;
    this.stars[index].forEach((star) => {
      ctx.fillStyle = '#E4E4FF';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 50, 50 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#E4E4FF';
      // ctx.stroke();  // If you want the stars to have outlines
    });
    this.drawConnections(canvas, ctx, index);
  }

  private drawConnections(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    index: number
  ): void {
    ctx.beginPath();
    this.stars[index].forEach((star) => {
      ctx.moveTo(star.x, star.y);
      this.stars[index].forEach((otherStar) => {
        if (this.distance(star, otherStar) < 150) {
          ctx.lineTo(otherStar.x, otherStar.y);
        }
      });
    });
    ctx.lineWidth = 0.00000000000001;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  private distance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ) {
    let xs = point2.x - point1.x;
    xs = xs * xs;
    let ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
  }

  private animate(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    index: number
  ): void {
    this.drawStars(canvas, ctx, index);
    this.updateStars(index);
    this.animationFrames[index] = requestAnimationFrame(() =>
      this.animate(canvas, ctx, index)
    );
  }

  private updateStars(index: number): void {
    this.stars[index].forEach((star) => {
      star.x += star.vx / this.FPS;
      star.y += star.vy / this.FPS;
      if (star.x < 0 || star.x > window.innerWidth) star.vx = -star.vx;
      if (star.y < 0 || star.y > window.innerHeight) star.vy = -star.vy;
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animationFrames.forEach((frame) =>
        window.cancelAnimationFrame(frame)
      );
      this.animationFrames = [];
      this.canvasElements.forEach((canvasRef, index) => {
        this.setupStarCanvas(canvasRef.nativeElement, index);
      });
    }
  }

  private accordian(): void {
    const choiceArray = document.querySelectorAll('.choice_accordion');
    if (choiceArray.length > 0) {
      choiceArray.forEach((card) => {
        card.addEventListener('click', () => {
          choiceArray.forEach((element) => {
            element.classList.remove('expand', 'unset', 'small');
            element.classList.add('small');
          });
          card.classList.remove('small');
          card.classList.add('expand');
        });
      });
    }
    console.log('clickme');
  }
  private changeImages(): void {
    if (isPlatformBrowser(this.platformId)) {
      let bannerImages = document.getElementsByClassName('item');
      let imageIndex = 1;
      const changeBackground = () => {
        for (let i = 0; i < bannerImages.length; i++) {
          let item = bannerImages[i] as HTMLElement;
          item.style.backgroundImage = `url('${environment.cdnUrl}assets/CSR/background${imageIndex}.png')`;
        }
        imageIndex++;
        if (imageIndex > 4) {
          imageIndex = 1;
        }

        setTimeout(changeBackground, 5000);
      };

      changeBackground();
    }
    return undefined;
  }
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    prevArrow: false,
    nextArrow: false,
  };
}
