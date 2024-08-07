import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievableManagementComponent } from './recievable-management.component';

describe('RecievableManagementComponent', () => {
  let component: RecievableManagementComponent;
  let fixture: ComponentFixture<RecievableManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecievableManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecievableManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
