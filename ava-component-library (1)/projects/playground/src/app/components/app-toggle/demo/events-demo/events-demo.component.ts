import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-events-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './events-demo.component.html',
  styleUrls: ['./events-demo.component.scss']
})
export class EventsDemoComponent {
  eventLogs: string[] = [];

  onEventToggleChange(checked: boolean) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLogs.unshift(
      `[${timestamp}] Event toggle changed to: ${checked ? 'enabled' : 'disabled'}`
    );

    // Keep only last 10 entries
    if (this.eventLogs.length > 10) {
      this.eventLogs = this.eventLogs.slice(0, 10);
    }

    console.log('Event toggle:', checked ? 'enabled' : 'disabled');
  }
}
