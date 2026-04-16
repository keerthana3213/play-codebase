import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChatPanelComponent } from './test-chat-panel.component';

describe('TestChatPanelComponent', () => {
  let component: TestChatPanelComponent;
  let fixture: ComponentFixture<TestChatPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChatPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
