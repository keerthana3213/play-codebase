import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-basic-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <div class="calendar-wrapper">      
        <aava-datepicker (dateSelected)="onDateSelected($event)"> </aava-datepicker>
      </div>

      <!-- <div class="selected-info" *ngIf="selectedDate">
        <p style="color: var(--text-primary)">
          <strong>Selected Date:</strong>
          {{ selectedDate | date : 'fullDate' }}
        </p>
      </div> -->
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
        margin: 0;
        color: var(--text-primary);
      }
    `,
  ],
})
export class BasicDemoComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
