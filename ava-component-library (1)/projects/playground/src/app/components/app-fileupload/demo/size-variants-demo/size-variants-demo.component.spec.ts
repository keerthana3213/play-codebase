import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeVariantsDemoComponent } from './size-variants-demo.component';

describe('SizeVariantsDemoComponent', () => {
  let component: SizeVariantsDemoComponent;
  let fixture: ComponentFixture<SizeVariantsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeVariantsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeVariantsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
