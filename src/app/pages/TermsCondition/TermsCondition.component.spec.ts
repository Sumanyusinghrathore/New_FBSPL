import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionComponent } from './TermsCondition.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TermsConditionComponent', () => {
  let component: TermsConditionComponent;
  let fixture: ComponentFixture<TermsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsConditionComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
