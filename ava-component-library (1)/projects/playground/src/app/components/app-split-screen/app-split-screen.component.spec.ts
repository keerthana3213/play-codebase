import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSplitScreenComponent } from './app-split-screen.component';

describe('AppSplitScreenComponent', () => {
  let component: AppSplitScreenComponent;
  let fixture: ComponentFixture<AppSplitScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSplitScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSplitScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
