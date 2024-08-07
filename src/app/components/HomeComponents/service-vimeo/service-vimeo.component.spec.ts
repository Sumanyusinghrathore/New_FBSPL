import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVimeoComponent } from './service-vimeo.component';

describe('ServiceVimeoComponent', () => {
  let component: ServiceVimeoComponent;
  let fixture: ComponentFixture<ServiceVimeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceVimeoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceVimeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
