import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textarea-events-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextareaComponent],
  templateUrl: './textarea-events-demo.component.html',
  styleUrls: ['./textarea-events-demo.component.scss'],
})
export class TextareaEventsDemoComponent {
  inputValue = '';
  focusValue = '';
  blurValue = '';
  changeValue = '';
  events: string[] = [];

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.inputValue = target.value;
    this.addEvent('Input event triggered');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFocus(_event: Event) {
    this.addEvent('Focus event triggered');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBlur(_event: Event) {
    this.addEvent('Blur event triggered');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_event: Event) {
    this.addEvent('Change event triggered');
  }

  private addEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.events.unshift(`[${timestamp}] ${message}`);
    // Keep only last 10 events
    if (this.events.length > 10) {
      this.events = this.events.slice(0, 10);
    }
  }

  clearEvents() {
    this.events = [];
  }
}
