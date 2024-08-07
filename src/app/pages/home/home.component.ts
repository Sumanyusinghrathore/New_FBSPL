import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnDestroy,
  HostListener,
  OnInit, NgZone
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import bodymovin from 'lottie-web';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnectComponent } from '../../components/HomeComponents/letsConnect/connect.component';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';
import animationInsurance from '../../../assets/Animations/animationInsurance.json';
import animationEcommerce from '../../../assets/Animations/E-Commerce.json';
import JiraAnimation from '../../../assets/Animations/JiraAnimation.json';
// import ParticleAnimation from '../../../assets/Animations/ParticleAnimation.json';
import JiraAnimationMob from '../../../assets/Animations/JiraAnimationMob.json';
import animationBooking from '../../../assets/Animations/animationBooking.json';
import DigitalMarketing from '../../../assets/Animations/DigitalMarketing.json';
import { Router, NavigationEnd } from '@angular/router';
import { SeoData } from '../../services/seo/seo-data.model';
import { SeoService } from '../../services/seo/seo.service';
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ConnectComponent,
    RouterLink,
    RouterOutlet,
    CdnUrlDirective,
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private timeoutId: number | null = null;
  private timeoutId1: number | null = null;
  @ViewChild('binaryCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChildren(
    'starCanvas1, starCanvas2, starCanvas3, starCanvas4, starCanvas5, starCanvas6, starCanvas7, starCanvas8'
  )
  canvasElements!: QueryList<ElementRef<HTMLCanvasElement>>;
  private ctx!: CanvasRenderingContext2D;
  private ctxStar!: CanvasRenderingContext2D;
  private raf!: number;
  private bits: any[] = [];
  private interval = 1000 / 5;
  private now!: number;
  private then = Date.now();
  private delta!: number;
  private activeSection = '';

  private FPS = 60;
  private mouse = { x: 0, y: 0 };
  private maxStars = 50;
  sectionIndex: number = 1;
  sectionIndex1: number = 1;
  intervalId: any;
  intervalId1: any;
  // timeoutId: any = null;

  // constructor(private ngZone: NgZone, @Inject(DOCUMENT) private document: Document) {}
  private stars: any[][] = [];
  private animationFrames: number[] = [];
  currentLogo =
    'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/insurance-applied.png';
  currentLogo1 =
    'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/ams360Book.png';
  constructor(
    private router: Router,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService
  ) {
    // gsap.registerPlugin(ScrollTrigger);
    this.updateRangeInput();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleBodyClass(event.url);
        // console.log(event.url);
      }
    });
  }

  private handleBodyClass(url: string) {
    if (isPlatformBrowser(this.platformId)) {
      let body = document.getElementById('body');

      if (body !== null) {
        if (
          url === '/' ||
          url === '/#data-annotation' ||
          url === '/#insurance' ||
          url === '/#accounting' ||
          url === '/#ecommerce' ||
          url === '/#digital-marketing'
        ) {
          body.style.overflow = 'visible';
        } else {
          body.style.overflow = 'hidden';
        }
      }
      if (
        url === '/case-studies#insurance' ||
        url === '/case-studies#accounting&bookkeeping' ||
        url === '/case-studies#ecommerce' ||
        url === '/case-studies#dataAnnotation'
      ) {
        window.scrollTo(0, 0);
      }
    }
  }

  ngAfterViewInit(): void {
    this.startSectionRotation();
    this.startSectionRotation1();
    if (isPlatformBrowser(this.platformId)) {
      // const JiraAnimationMob = document.getElementById(
      //   'JiraAnimationMob'
      // ) as HTMLElement;
      // const animationInsurance = document.getElementById('animationInsurance') as HTMLElement;
      const animationEcommerce = document.getElementById(
        'animationEcommerce'
      ) as HTMLElement;
      // const JiraAnimation = document.getElementById(
      //   'JiraAnimation'
      // ) as HTMLElement;
      const animationBooking = document.getElementById(
        'animationBooking'
      ) as HTMLElement;
      const DigitalMarketing = document.getElementById(
        'DigitalMarketing'
      ) as HTMLElement;

      // if (JiraAnimationMob) {
      //   bodymovin.loadAnimation({
      //     container: JiraAnimationMob,
      //     autoplay: true,
      //     renderer: 'svg',
      //     loop: true,
      //     path: 'https://d1585q1wairh36.cloudfront.net/assets/Animations/JiraAnimationMob.json',
      //   });
      // } else {
      //   console.error('Animation container element not found');
      // }
      const animationInline = bodymovin.loadAnimation({
        container: document.getElementById('animationInsurance') as HTMLElement,
        autoplay: true,
        renderer: 'svg',
        loop: true,
        animationData: animationInsurance,
      });
      if (animationEcommerce) {
        bodymovin.loadAnimation({
          container: animationEcommerce,
          autoplay: true,
          renderer: 'svg',
          loop: true,
          path: 'https://d1585q1wairh36.cloudfront.net/assets/Animations/E-Commerce.json',
        });
      } else {
        // console.error('Animation container element not found');
      }
      // if (JiraAnimation) {
      //   bodymovin.loadAnimation({
      //     container: JiraAnimation,
      //     autoplay: true,
      //     renderer: 'svg',
      //     loop: true,
      //     path: 'https://d1585q1wairh36.cloudfront.net/assets/Animations/JiraAnimation.json',
      //   });
      // } else {
      //   console.error('Animation container element not found');
      // }
      if (animationBooking) {
        bodymovin.loadAnimation({
          container: animationBooking,
          autoplay: true,
          renderer: 'svg',
          loop: true,
          path: 'https://d1585q1wairh36.cloudfront.net/assets/Animations/animationBooking.json',
        });
      } else {
      }
      if (DigitalMarketing) {
        bodymovin.loadAnimation({
          container: DigitalMarketing,
          autoplay: true,
          renderer: 'svg',
          loop: true,
          path: 'https://d1585q1wairh36.cloudfront.net/assets/Animations/DigitalMarketing.json',
        });
      } else {
      }

      this.canvasElements.forEach((canvasRef, index) => {
        this.setupStarCanvas(canvasRef.nativeElement, index);
      });
    }
  }

  insurance2Data = [
    {
      line: 'Unburden agency operations with platform experts',
      alt: 'FBSPL insurance tool Applied System',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/applied.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/insurance-applied.png',
      active: true,
    },
    {
      line: 'Stay compliant with insurance regulation',
      alt: 'FBSPL insurance tool AMS 360',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/AMS360.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/ams360.png',
      active: false,
    },
    {
      line: 'Customized quotes and coverage options',
      alt: 'FBSPL insurance tool EZLynx',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/EZLynx.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/ezlynx.png',
      active: false,
    },
    {
      line: 'Cover all your personal and commercial lines needs ',
      alt: 'FBSPL insurance tool Hawksoft',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/hawksoft.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/hawksoft.png',
      active: false,
    },
  ];  

  // ngOnInit(): void {
  //   this.startSectionRotation();
  // }

  // ngOnDestroy(): void {
  //   this.clearSectionRotation();
  // }

  private startSectionRotation(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          if (this.insurance2Data[this.sectionIndex] !== undefined) {
            this.setBtn(this.insurance2Data[this.sectionIndex]);
            this.sectionIndex = (this.sectionIndex + 1) % this.insurance2Data.length;
          } else {
            this.clearSectionRotation();
          }
        });
      }, 8000);
    });
  }

  private clearSectionRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setBtn(selectedSection: any): void {
    this.insurance2Data.forEach((section) => {
      section.active = section === selectedSection;
      this.currentLogo = selectedSection.img2;
      this.typeText(selectedSection.line);
    });
  }

  typeText(text: string) {
    const element = this.document.getElementById('insurance2-parra');
    if (!element) return;

    let index = 0;
    const speed = 100; // typing speed in milliseconds

    element.textContent = ''; // clear the current text

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        this.timeoutId = window.setTimeout(type, speed);
      }
    };

    this.clearTimeout(); // Clear any previous timeout before starting
    type();
  }

  clearTimeout() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  accounting2Data = [
    {
      line1: 'Generate precise and detailed financial reports',
      alt1: 'FBSPL accounting & bookkeeping tool QuickBooks',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/home/QuickBooksbtn.png',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/ams360Book.png',
      img3: 'https://d1585q1wairh36.cloudfront.net/assets/home/QuickBooksbtnblue.png',
      active: true,
    },
    {
      alt1: 'FBSPL accounting & bookkeeping tool Zoho',
      line1: 'Real-time insights into cashflow',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/home/zohoBookbtn.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/zohoBook.png',
      img3: 'https://d1585q1wairh36.cloudfront.net/assets/home/zohoBookbtnblue.svg',
      active: false,
    },
    {
      alt1: 'FBSPL accounting & bookkeeping tool odoo',
      line1: 'Adapt to your changing business needs',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/home/odoobtn.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/odooBook.png',
      img3: 'https://d1585q1wairh36.cloudfront.net/assets/home/odoobtnblue.svg',
      active: false,
    },
    {
      alt1: 'FBSPL accounting & bookkeeping tool NetSuite',
      line1: 'Go beyond traditional accounting',
      img: 'https://d1585q1wairh36.cloudfront.net/assets/home/netsuitbtn.svg',
      img2: 'https://d1585q1wairh36.cloudfront.net/assets/insurance-logo/netsuitBook.png',
      img3: 'https://d1585q1wairh36.cloudfront.net/assets/home/netsuitebtnblue.svg',
      active: false,
    },
  ];

  private startSectionRotation1(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId1 = setInterval(() => {
        this.ngZone.run(() => {
          if (this.accounting2Data[this.sectionIndex1] !== undefined) {
            this.setBtn1(this.accounting2Data[this.sectionIndex1]);
            this.sectionIndex1 = (this.sectionIndex1 + 1) % this.accounting2Data.length;
          } else {
            this.clearSectionRotation1();
          }
        });
      }, 8000);
    });
  }

  private clearSectionRotation1(): void {
    if (this.intervalId1) {
      clearInterval(this.intervalId1);
    }
  }

  setBtn1(selectedSection1: any): void {
    this.accounting2Data.forEach((section) => {
      section.active = section === selectedSection1;
      this.currentLogo1 = selectedSection1.img2;
      this.typeText1(selectedSection1.line1);
    });
  }

  typeText1(text1: string) {
    const element1 = this.document.getElementById('accounting2-parra');
    if (!element1) return;

    let index1 = 0;
    const speed1 = 100; // typing speed1 in milliseconds

    element1.textContent = ''; // clear the current text

    const type1 = () => {
      if (index1 < text1.length) {
        element1.textContent += text1.charAt(index1);
        index1++;
        this.timeoutId1 = window.setTimeout(type1, speed1);
      }
    };

    this.clearTimeout1(); // Clear any previous timeout before starting
    type1();
  }

  clearTimeout1() {
    if (this.timeoutId1 !== null) {
      clearTimeout(this.timeoutId1);
      this.timeoutId1 = null;
    }
  }

  sections = [
    { id: 'insurance', name: 'Insurance', active: true },
    { id: 'accounting', name: 'Accounting', active: false },
    // { id: 'ecommerce', name: 'Ecommerce', active: false },
    { id: 'data-annotation', name: 'Data Annotation', active: false },
    { id: 'digital-marketing', name: 'Digital Marketing', active: false },
  ];

  ngOnInit(): void {
    
    const seoData: SeoData = {
      title: 'Leading Global Consulting and BPM Firm | FBSPL',
      description:
        'We help transform your business with strategic business process management solutions in Insurance, E-commerce, Accounting, digital, and data annotation, using state-of-the-art automation.',
      keywords: 'bpm, business process management solutions',
      ogImage: '/Current-oppning/CurrentOpp.Banner.jpg',
    };
    this.seoService.setMetaTags(seoData);
    if (isPlatformBrowser(this.platformId)) {
      this.setupCanvas();
      this.populateBits();
      this.drawInitialBits();
      this.draw();
      this.activeSection = window.location.hash
        ? window.location.hash.slice(1)
        : 'insurance';
      this.activateSection(this.activeSection, false);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.cancelAnimationFrame(this.raf);
      this.animationFrames.forEach((frame) => {
        window.cancelAnimationFrame(frame);
      });
    }
    this.clearSectionRotation();
    this.clearSectionRotation1();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Update the range input value and tooltip when the window scrolls
    this.updateRangeInput();
    this.updateTooltip();
  }

  private updateRangeInput() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const rangeValue = (scrollPosition / maxScroll) * 100;
      const rangeInput = document.getElementById('myRange') as HTMLInputElement;
      if (rangeInput) {
        rangeInput.value = Math.round(rangeValue).toString();
      }
    }
  }

  private updateTooltip() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Determine which section is currently visible
      let tooltipText = '';
      const insuranceSection = document.getElementById('insurance');
      const accountingSection = document.getElementById('accounting');
      const ecommerceSection = document.getElementById('ecommerce');
      const dataSection = document.getElementById('data-annotation');
      const digitalSection = document.getElementById('digital-marketing');

      // Check visibility for each section and update tooltipText accordingly
      if (
        insuranceSection &&
        this.isElementVisible(insuranceSection, scrollPosition)
      ) {
        tooltipText = 'Insurance';
      }
      if (
        accountingSection &&
        this.isElementVisible(accountingSection, scrollPosition)
      ) {
        tooltipText = 'Accounting';
      }
      if (
        ecommerceSection &&
        this.isElementVisible(ecommerceSection, scrollPosition)
      ) {
        tooltipText = 'Ecommerce';
      }
      if (dataSection && this.isElementVisible(dataSection, scrollPosition)) {
        tooltipText = 'Data Anntation';
      }
      if (
        digitalSection &&
        this.isElementVisible(digitalSection, scrollPosition)
      ) {
        tooltipText = 'Digital Marketing';
      }

      const rangeInput = document.getElementById('myRange') as HTMLInputElement;
      if (rangeInput) {
        rangeInput.title = tooltipText;
      }
    }
  }

  private isElementVisible(
    element: HTMLElement,
    scrollPosition: number
  ): boolean {
    const rect = element.getBoundingClientRect();
    // Check if the top or bottom of the element is within the viewport
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    // Update the range input value and tooltip when the user scrolls manually
    this.updateRangeInput();
    this.updateTooltip();
  }

  ////////////////////////////
  subNavStyles: any = {};

  ////////////////////////////

  private setupStarCanvas(canvas: HTMLCanvasElement, index: number): void {
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.stars[index] = [];
    this.populateStars(canvas, index);
    this.animate(canvas, ctx, index);
  }

  private populateStars(canvas: HTMLCanvasElement, index: number): void {
    this.maxStars = window.innerWidth <= 992 ? 20 : 50;
    this.maxStars = window.innerWidth <= 500 ? 0 : 20;
    const maxRadius = window.innerWidth <= 500 ? 0 : 1;
    for (let i = 0; i < this.maxStars; i++) {
      this.stars[index].push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * maxRadius + 1,
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
      ctx.fillStyle = '#777';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.stroke(); // If you want the stars to have outlines
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
    ctx.lineWidth = window.innerWidth <= 992 ? 0.1 : 0.05;
    ctx.strokeStyle = 'blue';
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

  setupCanvas(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    this.ctx.font = '20px futura-pt, sans-serif';
    this.ctx.fillStyle = '#E4E4FF';
  }

  populateBits(): void {
    const fontSize = 20;
    const columns = Math.floor(this.canvas.nativeElement.width / fontSize) + 1;
    const rows = Math.floor(this.canvas.nativeElement.height / fontSize) + 1;
    const binChars = ['0', '1'];
    this.bits = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        this.bits.push({
          x: c * fontSize,
          y: r * fontSize,
          value: binChars[Math.floor(Math.random() * binChars.length)],
          hasDrawn: false,
        });
      }
    }
  }

  drawInitialBits(): void {
    for (let bit of this.bits) {
      this.ctx.clearRect(bit.x, bit.y, 20, 20);
      this.ctx.fillText(bit.value, bit.x, bit.y + 20);
      bit.hasDrawn = true;
    }
  }

  draw(): void {
    this.raf = window.requestAnimationFrame(() => this.draw());
    this.now = Date.now();
    this.delta = this.now - this.then;

    if (this.delta > this.interval) {
      this.bits.forEach((bit) => {
        if (bit.hasDrawn === true && Math.random() * 100 > 95) {
          let newVal = bit.value === '1' ? '0' : '1';
          this.ctx.clearRect(bit.x, bit.y, 20, 20);
          this.ctx.fillText(newVal, bit.x, bit.y + 20);
          bit.value = newVal;
        }
      });
      this.then = this.now - (this.delta % this.interval);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupCanvas();
      this.populateBits();
      this.drawInitialBits();
      this.animationFrames.forEach((frame) =>
        window.cancelAnimationFrame(frame)
      );
      this.animationFrames = [];
      this.canvasElements.forEach((canvasRef, index) => {
        this.setupStarCanvas(canvasRef.nativeElement, index);
      });
    }
  }

  moveDivisor(event: Event): void {
    const slider = event.target as HTMLInputElement;
    const divisor = document.getElementById('divisor') as HTMLElement;
    if (divisor) {
      const widthPercent = slider.value + '%';
      divisor.style.width = widthPercent;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Detect scroll direction
    if (window.pageYOffset > this.previousScrollTop) {
      // Scrolling down
      this.subNavStyles = {}; // Reset styles to default or empty
    } else {
      // Scrolling up
      this.subNavStyles = {
        top: `calc(-50px + ${window.pageYOffset}px)`, // Adjust top position dynamically
      };
    }
    this.previousScrollTop = window.pageYOffset;
    // Only run scroll logic in the browser
    if (isPlatformBrowser(this.platformId)) {
      let currentSection = this.activeSection;
      const offset = window.innerHeight / 2; // Trigger point

      this.sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.top >= offset - rect.height) {
            currentSection = section.id;
          }
        }
      });

      if (currentSection !== this.activeSection) {
        this.activateSection(currentSection, false);
      }
    }
  }
  previousScrollTop = 0;
  activateSection(sectionId: string, shouldScroll: boolean = true): void {
    this.activeSection = sectionId;
    this.sections.forEach(
      (section) => (section.active = section.id === sectionId)
    );

    // Scroll to the section if triggered by a click and in the browser
    if (shouldScroll && isPlatformBrowser(this.platformId)) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
