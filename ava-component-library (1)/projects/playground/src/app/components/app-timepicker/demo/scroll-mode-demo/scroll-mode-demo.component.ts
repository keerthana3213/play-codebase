import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-scroll-mode-demo',
  standalone: true,
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './scroll-mode-demo.component.html',
  styleUrls: ['./scroll-mode-demo.component.scss'],
})
export class ScrollModeDemoComponent {
  selectedTime = '';
  scrollEvents: string[] = [];

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }

  onScrollEvent(event: any) {
    this.scrollEvents.unshift(
      `Scroll event: ${new Date().toLocaleTimeString()}`
    );
    if (this.scrollEvents.length > 5) {
      this.scrollEvents.pop();
    }
  }
}
