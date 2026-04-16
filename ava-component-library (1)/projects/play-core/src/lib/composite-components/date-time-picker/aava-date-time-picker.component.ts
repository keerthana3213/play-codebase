import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaCalendarComponent,
  DateRange,
} from '../../components/datepicker/aava-datepicker.component';
import { AavaTimePickerComponent } from '../../../public-api';

export interface DateTimeSelection {
  date: Date | null;
  time: string;
  dateRange?: DateRange;
}

@Component({
  selector: 'aava-date-time-picker',
  imports: [CommonModule, AavaCalendarComponent, AavaTimePickerComponent],
  templateUrl: './aava-date-time-picker.component.html',
  styleUrl: './aava-date-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaDateTimePickerComponent {
  @Input() isRange = false;
  @Input() selectedDate: Date | null = null;
  @Input() dateRange: DateRange = { start: null, end: null };
  @Input() selectedTime = '';
  @Input() alwaysOpen = false;
  @Input() weekdayFormat: 1 | 2 | 3 = 3;
  @Input() selectorShape: 'square' | 'circle' = 'square';
  @Input() surface = false;
  @Input() surfaceStrength: 'medium' | 'strong' | 'max' | undefined = 'medium';

  @Output() dateTimeSelected = new EventEmitter<DateTimeSelection>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() rangeSelected = new EventEmitter<DateRange>();
  @Output() timeSelected = new EventEmitter<string>();

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.dateSelected.emit(date);
    this.emitDateTimeSelection();
  }

  onRangeSelected(range: DateRange): void {
    this.dateRange = range;
    this.rangeSelected.emit(range);
    this.emitDateTimeSelection();
  }

  onTimeSelected(time: string): void {
    this.selectedTime = time;
    this.timeSelected.emit(time);
    this.emitDateTimeSelection();
  }

  private emitDateTimeSelection(): void {
    const selection: DateTimeSelection = {
      date: this.selectedDate,
      time: this.selectedTime,
      dateRange: this.isRange ? this.dateRange : undefined,
    };
    this.dateTimeSelected.emit(selection);
  }
}
