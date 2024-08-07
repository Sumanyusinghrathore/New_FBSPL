import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticManagement } from './logistic-management.component';

describe('PreSalesSupport', () => {
  let component: LogisticManagement;
  let fixture: ComponentFixture<LogisticManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticManagement]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogisticManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
