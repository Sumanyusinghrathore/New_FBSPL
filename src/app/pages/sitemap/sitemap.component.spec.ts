import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMapComponent } from './sitemap.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SiteMapComponent', () => {
  let component: SiteMapComponent;
  let fixture: ComponentFixture<SiteMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMapComponent, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
