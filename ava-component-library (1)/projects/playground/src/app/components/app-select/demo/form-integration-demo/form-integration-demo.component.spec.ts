import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIntegrationDemoComponent } from './form-integration-demo.component';

describe('FormIntegrationDemoComponent', () => {
  let component: FormIntegrationDemoComponent;
  let fixture: ComponentFixture<FormIntegrationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIntegrationDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIntegrationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
