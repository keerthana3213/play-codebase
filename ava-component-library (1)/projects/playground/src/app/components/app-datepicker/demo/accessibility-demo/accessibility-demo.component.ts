import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-accessibility-demo',
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
        max-width: 800px;
        margin: 0 auto;
      }

      h2 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        text-align: center;
      }

      p {
        color: var(--text-color-secondary);
        margin-bottom: 2rem;
        text-align: center;
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

      .accessibility-features {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-bottom: 2rem;
      }

      .accessibility-features h3 {
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .feature-item {
        background: var(--surface-ground);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1rem;
      }

      .feature-item h4 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      .feature-item p {
        color: var(--text-color-secondary);
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
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
        line-height: 1.4;
      }

      @media (max-width: 768px) {
        .features-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AccessibilityDemoComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
