import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaCalendarComponent,
  DateRange,
} from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-range-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <div class="calendar-wrapper">
        <aava-datepicker
          [isRange]="true"
          (rangeSelected)="onRangeSelected($event)"
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
      }

      .selected-info p {
        margin: 0.5rem 0;
        color: var(--text-primary);
      }

      .selected-info p:first-child {
        font-weight: 600;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class RangeDemoComponent {
  selectedRange: DateRange = { start: null, end: null };

  onRangeSelected(range: DateRange) {
    this.selectedRange = range;
    console.log('Selected range:', range);
  }


}
