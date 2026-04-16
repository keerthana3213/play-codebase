import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMultipleDemoComponent } from './single-multiple-demo.component';

describe('SingleMultipleDemoComponent', () => {
  let component: SingleMultipleDemoComponent;
  let fixture: ComponentFixture<SingleMultipleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMultipleDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMultipleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
