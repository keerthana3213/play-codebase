import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-size-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <div class="calendar-wrapper">
        <aava-datepicker (dateSelected)="onDateSelected($event)" calendarSize="xs" label="Extra Small">
</aava-datepicker>
<aava-datepicker (dateSelected)="onDateSelected($event)" calendarSize="sm" label="Small">
</aava-datepicker>
<aava-datepicker (dateSelected)="onDateSelected($event)" calendarSize="md" label="Medium">
</aava-datepicker>
<aava-datepicker (dateSelected)="onDateSelected($event)" calendarSize="lg" label="Large">
</aava-datepicker>
<aava-datepicker (dateSelected)="onDateSelected($event)" calendarSize="xl" label="Extra Large">
</aava-datepicker>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 800px;
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        justify-items: center;
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
export class CalendarSizeDemoComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
