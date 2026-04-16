import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAuthenticationflowcomponentComponent } from './app-authenticationflowcomponent.component';

describe('AppAuthenticationflowcomponentComponent', () => {
  let component: AppAuthenticationflowcomponentComponent;
  let fixture: ComponentFixture<AppAuthenticationflowcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAuthenticationflowcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAuthenticationflowcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
