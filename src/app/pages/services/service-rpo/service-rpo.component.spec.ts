import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRPOComponent } from './service-rpo.component';

describe('ServiceRPOComponent', () => {
  let component: ServiceRPOComponent;
  let fixture: ComponentFixture<ServiceRPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRPOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceRPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
