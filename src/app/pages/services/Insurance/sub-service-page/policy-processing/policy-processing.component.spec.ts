import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyProcessingComponent } from './policy-processing.component';

describe('PolicyProcessingComponent', () => {
  let component: PolicyProcessingComponent;
  let fixture: ComponentFixture<PolicyProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyProcessingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PolicyProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
