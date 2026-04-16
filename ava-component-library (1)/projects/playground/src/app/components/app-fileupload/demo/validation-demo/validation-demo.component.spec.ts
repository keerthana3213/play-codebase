import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemoComponent } from './validation-demo.component';

describe('ValidationDemoComponent', () => {
  let component: ValidationDemoComponent;
  let fixture: ComponentFixture<ValidationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
