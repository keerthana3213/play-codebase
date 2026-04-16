import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-always-open-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <div class="calendar-wrapper">
        <aava-datepicker
          [alwaysOpen]="true"
          (dateSelected)="onDateSelected($event)"
        >
        </aava-datepicker>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 600px;
        margin: 0 auto;
      }

      h2 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--text-color-secondary);
        margin-bottom: 2rem;
      }

      .calendar-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
      }

      .selected-info {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1rem;
        text-align: center;
        margin-bottom: 2rem;
      }

      .selected-info p {
        margin: 0;
        color: var(--text-primary);
      }

      .info-box {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
      }

      .info-box h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }

      .info-box ul {
        margin: 0;
        padding-left: 1.5rem;
        color: var(--text-color-secondary);
      }

      .info-box li {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class AlwaysOpenDemoComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
