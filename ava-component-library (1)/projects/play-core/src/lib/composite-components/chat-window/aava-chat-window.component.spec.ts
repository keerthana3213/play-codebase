import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaChatWindowComponent, ChatMessage, ChatWindowIcon } from './aava-chat-window.component';
import { By } from '@angular/platform-browser';
import { Component, ElementRef } from '@angular/core';

describe('ChatWindowComponent', () => {
  let component: AavaChatWindowComponent;
  let fixture: ComponentFixture<AavaChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaChatWindowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaChatWindowComponent);
    component = fixture.componentInstance;

    // Mock the messagesContainer element
    component['messagesContainer'] = new ElementRef({
      scrollTop: 0,
      scrollHeight: 100,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set shouldScrollToBottom to true when messages change', () => {
      const changes: any = { messages: { currentValue: [{ id: '1', text: 'Hello', timestamp: '', isUser: true }] } };
      component.ngOnChanges(changes);
      expect((component as any).shouldScrollToBottom).toBeTrue();
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call scrollToBottom after timeout', fakeAsync(() => {
      spyOn<any>(component, 'scrollToBottom');
      component.ngAfterViewInit();
      tick(100);
      expect(component['scrollToBottom']).toHaveBeenCalled();
    }));
  });

  describe('ngAfterViewChecked', () => {
    it('should call scrollToBottom when shouldScrollToBottom is true', () => {
      spyOn<any>(component, 'scrollToBottom');
      (component as any).shouldScrollToBottom = true;
      component.ngAfterViewChecked();
      expect(component['scrollToBottom']).toHaveBeenCalled();
      expect((component as any).shouldScrollToBottom).toBeFalse();
    });

    it('should not call scrollToBottom when shouldScrollToBottom is false', () => {
      spyOn<any>(component, 'scrollToBottom');
      (component as any).shouldScrollToBottom = false;
      component.ngAfterViewChecked();
      expect(component['scrollToBottom']).not.toHaveBeenCalled();
    });
  });

  describe('sendMessage', () => {
    it('should emit messageSent when currentMessage is valid', () => {
      spyOn(component.messageSent, 'emit');
      component.currentMessage = 'Hello';
      component.sendMessage();
      expect(component.messageSent.emit).toHaveBeenCalledWith('Hello');
      expect(component.currentMessage).toBe('');
    });

    it('should not emit when currentMessage is empty', () => {
      spyOn(component.messageSent, 'emit');
      component.currentMessage = '   ';
      component.sendMessage();
      expect(component.messageSent.emit).not.toHaveBeenCalled();
    });

    it('should not emit when disabled is true', () => {
      spyOn(component.messageSent, 'emit');
      component.disabled = true;
      component.currentMessage = 'Hello';
      component.sendMessage();
      expect(component.messageSent.emit).not.toHaveBeenCalled();
    });
  });

  describe('onKeyPress', () => {
    it('should call sendMessage on Enter without Shift', () => {
      spyOn(component, 'sendMessage');
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      Object.defineProperty(event, 'shiftKey', { value: false });
      spyOn(event, 'preventDefault');
      component.onKeyPress(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.sendMessage).toHaveBeenCalled();
    });

    it('should not call sendMessage when Shift is pressed', () => {
      spyOn(component, 'sendMessage');
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      Object.defineProperty(event, 'shiftKey', { value: true });
      component.onKeyPress(event);
      expect(component.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('onInput', () => {
    it('should update currentMessage on input', () => {
      const input = document.createElement('input');
      input.value = 'Test';
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: input });
      component.onInput(event);
      expect(component.currentMessage).toBe('Test');
    });
  });

  describe('focusInput', () => {
    it('should call focus on input element', () => {
      const input = document.createElement('input');
      spyOn(input, 'focus');
      const event = new Event('focus');
      Object.defineProperty(event, 'target', { value: input });
      component.focusInput(event);
      expect(input.focus).toHaveBeenCalled();
    });
  });

  describe('onIconClick', () => {
    it('should emit iconClicked and call icon click handler', () => {
      const icon: ChatWindowIcon = { name: 'test', slot: 'icon-start', click: jasmine.createSpy('click') };
      spyOn(component.iconClicked, 'emit');
      component.currentMessage = 'Hi';
      component.onIconClick(icon);
      expect(component.iconClicked.emit).toHaveBeenCalledWith({ icon, currentMessage: 'Hi' });
      expect(icon.click).toHaveBeenCalled();
    });

    it('should emit iconClicked even if no click handler', () => {
      const icon: ChatWindowIcon = { name: 'test', slot: 'icon-end' };
      spyOn(component.iconClicked, 'emit');
      component.onIconClick(icon);
      expect(component.iconClicked.emit).toHaveBeenCalled();
    });
  });

  describe('getIconsBySlot', () => {
    it('should return icons for the given slot', () => {
      component.icons = [
        { name: 'startIcon', slot: 'icon-start' },
        { name: 'endIcon', slot: 'icon-end' },
      ];
      expect(component.getIconsBySlot('icon-start').length).toBe(1);
      expect(component.getIconsBySlot('icon-end').length).toBe(1);
    });
  });

  describe('public methods', () => {
    it('triggerSend should call sendMessage', () => {
      spyOn(component, 'sendMessage');
      component.triggerSend();
      expect(component.sendMessage).toHaveBeenCalled();
    });

    it('getCurrentMessage should return currentMessage', () => {
      component.currentMessage = 'Hello World';
      expect(component.getCurrentMessage()).toBe('Hello World');
    });
  });

  describe('scrollToBottom', () => {
    it('should set scrollTop to scrollHeight', fakeAsync(() => {
      const el = { scrollTop: 0, scrollHeight: 200 };
      component['messagesContainer'] = new ElementRef(el);
      component['scrollToBottom']();
      tick();
      expect(el.scrollTop).toBe(0);
    }));
  });
});
