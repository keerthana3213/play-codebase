import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionSizesComponent } from './accordion-sizes.component';

describe('AccordionSizesComponent', () => {
  let component: AccordionSizesComponent;
  let fixture: ComponentFixture<AccordionSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionSizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
