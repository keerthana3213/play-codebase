import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeVariantComponent } from './size-variant.component';

describe('SizeVariantComponent', () => {
  let component: SizeVariantComponent;
  let fixture: ComponentFixture<SizeVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeVariantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
