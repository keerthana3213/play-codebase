import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimePickerComponent } from '@aava/play-core'

@Component({
  selector: 'ava-keyboard-navigation-demo',
  standalone: true,
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './keyboard-navigation-demo.component.html',
  styleUrls: ['./keyboard-navigation-demo.component.scss'],
})
export class KeyboardNavigationDemoComponent {
  selectedTime = '';
  keyboardEvents: string[] = [];

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }

  onKeyboardEvent(event: string) {
    this.keyboardEvents.unshift(
      `Keyboard: ${event} - ${new Date().toLocaleTimeString()}`
    );
    if (this.keyboardEvents.length > 5) {
      this.keyboardEvents.pop();
    }
  }
}
