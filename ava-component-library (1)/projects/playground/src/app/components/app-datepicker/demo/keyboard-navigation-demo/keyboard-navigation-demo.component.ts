import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-keyboard-navigation-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <h2>Keyboard Navigation</h2>
      <p>Advanced keyboard navigation with structured input field support.</p>

      <div class="calendar-wrapper">
        <aava-datepicker
          [alwaysOpen]="true"
          (dateSelected)="onDateSelected($event)"
        >
        </aava-datepicker>
      </div>

      <div class="selected-info" *ngIf="selectedDate">
        <p>
          <strong>Selected Date:</strong> {{ selectedDate | date : 'fullDate' }}
        </p>
      </div>

      <div class="keyboard-info">
        <h3>Keyboard Shortcuts:</h3>
        <div class="shortcuts-grid">
          <div class="shortcut-group">
            <h4>Calendar Navigation</h4>
            <ul>
              <li><kbd>Arrow Keys</kbd> - Move focus between days</li>
              <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Select date</li>
              <li>
                <kbd>Home</kbd> / <kbd>End</kbd> - First/last day of month
              </li>
              <li>
                <kbd>Page Up</kbd> / <kbd>Page Down</kbd> - Previous/next month
              </li>
            </ul>
          </div>

          <div class="shortcut-group">
            <h4>Input Field Navigation</h4>
            <ul>
              <li><kbd>Tab</kbd> - Move between day, month, year segments</li>
              <li><kbd>Arrow Keys</kbd> - Navigate within segments</li>
              <li>
                <kbd>Auto-advance</kbd> - Moves to next segment when complete
              </li>
              <li><kbd>Escape</kbd> - Close popup (if not always open)</li>
            </ul>
          </div>

          <div class="shortcut-group">
            <h4>Accessibility</h4>
            <ul>
              <li><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> - Logical tab order</li>
              <li><kbd>Screen Reader</kbd> - Announces current month/year</li>
              <li><kbd>Focus Indicators</kbd> - Clear visual focus states</li>
              <li>
                <kbd>ARIA Labels</kbd> - Descriptive labels for all controls
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h3>Try it out:</h3>
        <ol>
          <li>Click on the calendar to focus it</li>
          <li>Use arrow keys to navigate between days</li>
          <li>Press Enter or Space to select a date</li>
          <li>Use Tab to navigate through input fields</li>
          <li>Try Page Up/Down to change months</li>
        </ol>
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

      .keyboard-info {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-bottom: 2rem;
      }

      .keyboard-info h3 {
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .shortcuts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .shortcut-group h4 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1rem;
      }

      .shortcut-group ul {
        margin: 0;
        padding-left: 1rem;
        color: var(--text-color-secondary);
      }

      .shortcut-group li {
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }

      kbd {
        background: var(--surface-ground);
        border: 1px solid var(--surface-border);
        border-radius: 3px;
        padding: 0.2rem 0.4rem;
        font-size: 0.8rem;
        font-family: monospace;
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

      .info-box ol {
        margin: 0;
        padding-left: 1.5rem;
        color: var(--text-color-secondary);
      }

      .info-box li {
        margin-bottom: 0.5rem;
      }

      @media (max-width: 768px) {
        .shortcuts-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class KeyboardNavigationDemoComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }
}
