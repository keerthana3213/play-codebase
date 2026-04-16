import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToggleComponent } from './app-toggle.component';

describe('AppToggleComponent', () => {
  let component: AppToggleComponent;
  let fixture: ComponentFixture<AppToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
