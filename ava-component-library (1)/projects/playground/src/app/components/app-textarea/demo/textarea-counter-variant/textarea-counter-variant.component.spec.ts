import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaCounterVariantComponent } from './textarea-counter-variant.component';

describe('TextareaCounterVariantComponent', () => {
  let component: TextareaCounterVariantComponent;
  let fixture: ComponentFixture<TextareaCounterVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaCounterVariantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaCounterVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
