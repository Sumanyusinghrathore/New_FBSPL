import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowBestComponent } from './know-best.component';

describe('KnowBestComponent', () => {
  let component: KnowBestComponent;
  let fixture: ComponentFixture<KnowBestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowBestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnowBestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
