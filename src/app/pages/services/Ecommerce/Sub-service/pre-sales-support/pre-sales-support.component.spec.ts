import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSalesSupport } from './pre-sales-support.component';

describe('PreSalesSupport', () => {
  let component: PreSalesSupport;
  let fixture: ComponentFixture<PreSalesSupport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreSalesSupport]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreSalesSupport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
