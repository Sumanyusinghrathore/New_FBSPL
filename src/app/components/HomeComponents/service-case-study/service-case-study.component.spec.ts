import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCaseStudyComponent } from './service-case-study.component';

describe('ServiceCaseStudyComponent', () => {
  let component: ServiceCaseStudyComponent;
  let fixture: ComponentFixture<ServiceCaseStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCaseStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCaseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
