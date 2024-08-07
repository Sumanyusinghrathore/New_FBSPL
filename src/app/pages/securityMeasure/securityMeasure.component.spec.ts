import { ComponentFixture, TestBed } from '@angular/core/testing';

import { securityMeasureComponent } from './securityMeasure.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('securityMeasureComponent', () => {
  let component: securityMeasureComponent;
  let fixture: ComponentFixture<securityMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [securityMeasureComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(securityMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
