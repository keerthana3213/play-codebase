import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCalendarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-datepicker-min-max-demo',
  standalone: true,
  imports: [CommonModule, AavaCalendarComponent],
  template: `
    <div class="demo-container">
      <div class="demo-grid">
        <!-- Static Min/Max Dates -->
        <div class="demo-item">
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [minDate]="staticMinDate"
              [maxDate]="staticMaxDate"
              (dateSelected)="onDateSelected($event, 'static')"
            >
            </aava-datepicker>
          </div>
        </div>

        <!-- Dynamic Min/Max with Functions -->
        <div class="demo-item">
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [minDate]="getMinDate"
              [maxDate]="getMaxDate"
              (dateSelected)="onDateSelected($event, 'dynamic')"
            >
            </aava-datepicker>
          </div>
        </div>

        <!-- Range Selection with Constraints -->
        <div class="demo-item">
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [isRange]="true"
              [minDate]="getCurrentMonthStart"
              [maxDate]="getNextMonthEnd"
              (rangeSelected)="onRangeSelected($event)"
            >
            </aava-datepicker>
          </div>
        </div>

        <!-- Past Dates Only -->
        <div class="demo-item">
          <div class="calendar-wrapper">
            <aava-datepicker
              [alwaysOpen]="true"
              [maxDate]="getYesterday"
              (dateSelected)="onDateSelected($event, 'past')"
            >
            </aava-datepicker>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .demo-item {
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      background: var(--surface-background);
      height: 300px;
      display: flex;
      align-items: stretch;
      justify-content: center;
    }

    .calendar-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class MinMaxDemoComponent {
  // Static dates
  staticMinDate: string = '12/10/2025';
  staticMaxDate: string = '10/12/2025';

  // Selected dates for different demos
  selectedStaticDate: Date | null = null;
  selectedDynamicDate: Date | null = null;
  selectedPastDate: Date | null = null;
  selectedRange: { start: Date | null; end: Date | null } = { start: null, end: null };

  // Dynamic date functions
  getMinDate = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return this.formatDDMMYYYY(d);
  };

  getMaxDate = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return this.formatDDMMYYYY(d);
  };

  getCurrentMonthStart = (): string => {
    const today = new Date();
    const d = new Date(today.getFullYear(), today.getMonth(), 1);
    return this.formatDDMMYYYY(d);
  };

  getNextMonthEnd = (): string => {
    const today = new Date();
    const d = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    return this.formatDDMMYYYY(d);
  };

  getYesterday = (): string => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return this.formatDDMMYYYY(d);
  };

  onDateSelected(date: Date, type: string): void {
    console.log(`${type} date selected:`, date);
    switch (type) {
      case 'static':
        this.selectedStaticDate = date;
        break;
      case 'dynamic':
        this.selectedDynamicDate = date;
        break;
      case 'past':
        this.selectedPastDate = date;
        break;
    }
  }

  onRangeSelected(range: { start: Date | null; end: Date | null }): void {
    console.log('Range selected:', range);
    this.selectedRange = range;
  }

  private formatDDMMYYYY(d: Date): string {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  staticExample = `// Static min/max dates
export class MyComponent {
  minDate = new Date('2025-01-01');
  maxDate = new Date('2026-01-31');
}

<!-- Template -->
<aava-datepicker 
  [minDate]="minDate" 
  [maxDate]="maxDate"
  (dateSelected)="onDateSelected($event)">
</aava-datepicker>`;

  dynamicExample = `// Dynamic min/max with functions
export class MyComponent {
  getMinDate = (): Date => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  };

  getMaxDate = (): Date => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today;
  };
}

<!-- Template -->
<aava-datepicker 
  [minDate]="getMinDate" 
  [maxDate]="getMaxDate"
  (dateSelected)="onDateSelected($event)">
</aava-datepicker>`;
}
