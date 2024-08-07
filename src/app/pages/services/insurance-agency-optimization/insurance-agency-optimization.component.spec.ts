import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAgencyOptimizationComponent } from './insurance-agency-optimization.component';

describe('InsuranceAgencyOptimizationComponent', () => {
  let component: InsuranceAgencyOptimizationComponent;
  let fixture: ComponentFixture<InsuranceAgencyOptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceAgencyOptimizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceAgencyOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
