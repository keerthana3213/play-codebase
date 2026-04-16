import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-surface-effects-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <h2>Surface Effects</h2>
      <p>
        Glassmorphism effects with different strength levels for modern UI
        designs.
      </p>

      <div class="effects-grid">
        <div class="effect-item">
          <h3>Medium Strength</h3>
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [surface]="true"
              surfaceStrength="medium"
              (dateSelected)="onDateSelected($event)"
            >
            </aava-datepicker>
          </div>
        </div>

        <div class="effect-item">
          <h3>Strong Strength</h3>
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [surface]="true"
              surfaceStrength="strong"
              (dateSelected)="onDateSelected($event)"
            >
            </aava-datepicker>
          </div>
        </div>

        <div class="effect-item">
          <h3>Maximum Strength</h3>
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [surface]="true"
              surfaceStrength="max"
              (dateSelected)="onDateSelected($event)"
            >
            </aava-datepicker>
          </div>
        </div>
      </div>

      <div class="selected-info" *ngIf="selectedDate">
        <p>
          <strong>Selected Date:</strong> {{ selectedDate | date : 'fullDate' }}
        </p>
      </div>

      <div class="info-box">
        <h3>Glassmorphism Features:</h3>
        <ul>
          <li><strong>Medium:</strong> Subtle transparency and blur effect</li>
          <li>
            <strong>Strong:</strong> Enhanced transparency with deeper blur
          </li>
          <li>
            <strong>Maximum:</strong> Maximum transparency and blur for dramatic
            effect
          </li>
          <li>Perfect for modern, layered UI designs</li>
          <li>Works well with gradient backgrounds</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 1200px;
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

      .effects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .effect-item {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        min-height: 400px;
        display: flex;
        flex-direction: column;
      }

      .effect-item h3 {
        color: white;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 1.1rem;
      }

      .calendar-wrapper {
        display: flex;
        justify-content: center;
        flex: 1;
        align-items: center;
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

      @media (max-width: 768px) {
        .effects-grid {
          grid-template-columns: 1fr;
        }

        .effect-item {
          min-height: 350px;
        }
      }
    `,
  ],
})
export class SurfaceEffectsDemoComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
