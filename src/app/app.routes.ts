import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { OurLeaderComponent } from './pages/our-leader/our-leader.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LifeFbsplComponent } from './pages/life-fbspl/life-fbspl.component';
import { CSRComponent } from './pages/csr/csr.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { PodcastPageComponent } from './pages/podcast/podcast-page/podcast-page.component';
import { BookAConsultationComponent } from './pages/bookAConsultation/bookAConsultation.component';
import { CurrentOpeningComponent } from './pages/currentOpening/currentOpening.component';
import { JdComponent } from './pages/jd/jd.component';
import { ErrorComponent } from './pages/error/error.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { ContactUsComponent } from './pages/contactUs/contactUs.component';
import { CareerFormComponent } from './pages/career-form/career-form.component';
import { PrivacyPolicyComponent } from './pages/PrivacyPolicy/PrivacyPolicy.component';
import { TermsConditionComponent } from './pages/TermsCondition/TermsCondition.component';
import { GDPRComponent } from './pages/GDPR/GDPR.component';
import { securityMeasureComponent } from './pages/securityMeasure/securityMeasure.component';
import { NewsroomComponent } from './pages/newsroom/newsroom.component';
import { NewsPageComponent } from './pages/newsroom/news-page/news-page.component';
import { MainServiceComponent } from './pages/services/main-service.component';
import { CareerComponent } from './pages/career/career.component';
import { CaseStudyComponent } from './pages/case-study/case-study.component';
import { CaseStudyPageComponent } from './pages/case-study/caseStudy-page/cspage.component';
import { CareerThankyouComponent } from './pages/careerThankYou/careerThankYou.component';
import { SiteMapComponent } from './pages/sitemap/sitemap.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about-who-we-are',
    component: AboutUsComponent,
  },
  {
    path: 'our-leadership',
    component: OurLeaderComponent,
  },
  {
    path: 'csr-social-responsibilities',
    component: CSRComponent,
  },
  {
    path: 'life-at-fbspl',
    component: LifeFbsplComponent,
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/main-service.component-routing.module').then(
        (routes) => routes.ServicesRoutingModule
      ),
  },
  {
    path: 'bpm-and-bpo-services',
    component: MainServiceComponent,
  },
  {
    path: 'blogs',
    component: BlogComponent,
  },
  {
    path: 'blogs/:slug',
    component: BlogPageComponent,
  },
  {
    path: 'podcast',
    component: PodcastComponent,
  },
  {
    path: 'podcast/:slug',
    component: PodcastPageComponent,
  },
  {
    path: 'news',
    component: NewsroomComponent,
  },
  {
    path: 'news/:slug',
    component: NewsPageComponent,
  },
  {
    path: 'client-testimonial-reviews',
    component: TestimonialsComponent,
  },
  {
    path: 'book-free-consultation-call',
    component: BookAConsultationComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'careers/current-openings',
    component: CurrentOpeningComponent,
  },
  {
    path: 'jd',
    component: JdComponent,
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'book-free-consultation-call/thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'services/thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'careers/thankyou',
    component: CareerThankyouComponent,
  },
  {
    path: 'career-apply-thankyou',
    component: CareerThankyouComponent,
  },
  {
    path: 'alliances-and-partnership-with-fbspl/thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'media-and-general-query/thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'website-feedback/thankyou',
    component: ThankyouComponent,
  },
  {
    path: 'terms-&-condition',
    component: TermsConditionComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  // {
  //   path: 'GDPR',
  //   component: GDPRComponent,
  // },
  {
    path: 'sitemap',
    component: SiteMapComponent,
  },
  {
    path: 'security-measures',
    component: securityMeasureComponent,
  },
  {
    path: 'apply-now',
    component: CareerFormComponent,
  },
  {
    path: 'careers',
    component: CareerComponent,
  },
  {
    path: 'case-studies',
    component: CaseStudyComponent,
  },
  {
    path: 'case-studies/:slug',
    component: CaseStudyPageComponent,
  },
  // {
  //   path: 'new',
  //   loadChildren: () => import('./pages/new/new.routes').then(routes => routes.routes)
  // },
  { path: '404', component: ErrorComponent },
  { path: 'blog:', redirectTo: '/blogs:' },
  { path: 'blog', redirectTo: '/blogs' },
  { path: 'career', redirectTo: '/careers' },
  { path: 'cases', redirectTo: '/case-studies' },
  { path: '**', redirectTo: '/404' },
];
