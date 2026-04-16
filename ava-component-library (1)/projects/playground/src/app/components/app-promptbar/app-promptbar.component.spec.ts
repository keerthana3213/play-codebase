import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPromptbarComponent } from './app-promptbar.component';

describe('AppPromptbarComponent', () => {
  let component: AppPromptbarComponent;
  let fixture: ComponentFixture<AppPromptbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPromptbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPromptbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
