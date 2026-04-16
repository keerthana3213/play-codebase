import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChatWindowComponent } from './app-chat-window.component';

describe('AppChatWindowComponent', () => {
  let component: AppChatWindowComponent;
  let fixture: ComponentFixture<AppChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChatWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
