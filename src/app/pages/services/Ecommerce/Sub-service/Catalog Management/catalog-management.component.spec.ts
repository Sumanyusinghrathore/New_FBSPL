import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogManagement } from './catalog-management.component';

describe('CatalogManagement', () => {
  let component: CatalogManagement;
  let fixture: ComponentFixture<CatalogManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogManagement]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CatalogManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
