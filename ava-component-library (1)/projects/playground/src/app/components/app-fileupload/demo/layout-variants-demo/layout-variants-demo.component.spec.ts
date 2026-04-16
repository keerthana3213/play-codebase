import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVariantsDemoComponent } from './layout-variants-demo.component';

describe('LayoutVariantsDemoComponent', () => {
  let component: LayoutVariantsDemoComponent;
  let fixture: ComponentFixture<LayoutVariantsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutVariantsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutVariantsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
