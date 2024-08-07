import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableManagementComponent } from './payable-management.component';

describe('PayableManagementComponent', () => {
  let component: PayableManagementComponent;
  let fixture: ComponentFixture<PayableManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayableManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayableManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
