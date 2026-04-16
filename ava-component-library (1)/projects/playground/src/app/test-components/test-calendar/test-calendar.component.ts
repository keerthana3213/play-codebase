import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateRange } from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaCalendarComponent } from '../../../../../play-core/src/public-api';

@Component({
  selector: 'aava-test-calendar',
  imports: [CommonModule, AavaCalendarComponent, ReactiveFormsModule, AavaButtonComponent],
  templateUrl: './test-calendar.component.html',
  styleUrl: './test-calendar.component.scss'
})
export class TestCalendarComponent {
  selectedDate: Date | null = null;
  form: FormGroup;
  reactiveFormData: Record<string, unknown> | null = null;
  selectedRange: DateRange = { start: null, end: null };
  todayDate: Date = new Date();

  // Different date format examples
  selectedDateDDMMYYYY: Date | null = null;
  selectedDateMMDDYYYY: Date | null = null;
  selectedDateYYYYMMDD: Date | null = null;
  selectedRangeDDMMYYYY: DateRange = { start: null, end: null };
  selectedRangeMMDDYYYY: DateRange = { start: null, end: null };
  selectedRangeYYYYMMDD: DateRange = { start: null, end: null };
  showButtonCalendar = false;

  disabledDates1: string[] = [
    '01/10/2025',
    '04/10/2025',
    '05/03/2025'
  ];

  disabledDates2: string[] = [
    '24/12/2025',
    '25/12/2025',
    '31/12/2025'
  ];

  minDateCombined: string = '11/13/2025';
  maxDateCombined: string = '12/20/2025';
  disabledDatesCombined: string[] = [
    '10/10/2025',
    '15/10/2025',
    '20/10/2025'
  ];

  // Error state examples
  errorMessage = 'This field is required';
  showError = false;
  errorForm: FormGroup;
  invalidDateError = '';

  // Error clears when date is selected
  dateError = 'Please select a date to proceed';
  dateValue: Date | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      dateDisabled: [{ value: new Date(), disabled: true }]
    });

    // Form with error validation
    this.errorForm = this.fb.group({
      requiredDate: ['', Validators.required],
      customErrorDate: [''],
      invalidDate: ['']
    });
  }

  testSelectedDate: Date | null = new Date(2025, 9, 15); // October 15, 2025
  testSelectedRange: DateRange = { start: new Date(2025, 9, 10), end: new Date(2025, 9, 20) }; // October 10-20, 2025

  onTestSelectedDateChange(date: Date) {
    this.testSelectedDate = date;
    console.log('Test selectedDate changed to:', date);
  }

  onTestSelectedRangeChange(range: DateRange) {
    this.testSelectedRange = range;
    console.log('Test selectedRange changed to:', range);
  }

  setTestDate() {
    this.testSelectedDate = new Date(2025, 9, 15); // October 15, 2025
    console.log('Test date set to October 15, 2025');
  }

  clearTestDate() {
    this.testSelectedDate = null;
    console.log('Test date cleared to null - textbox should be empty');
  }

  setTestRange() {
    this.testSelectedRange = { start: new Date(2025, 9, 10), end: new Date(2025, 9, 20) }; // October 10-20, 2025
    console.log('Test range set to October 10-20, 2025');
  }

  clearTestRange() {
    this.testSelectedRange = { start: null, end: null };
    console.log('Test range cleared to null - textbox should be empty');
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date);
  }

  onReactiveSubmit() {
    if (this.form.valid) {
      this.reactiveFormData = this.form.value;
      console.log('Reactive form submitted:', this.reactiveFormData);
    }
  }

  onRangeSelected(range: DateRange) {
    this.selectedRange = range;
    console.log('Selected range:', range);
  }

  // Event handlers for different date formats
  onDateSelectedDDMMYYYY(date: Date) {
    this.selectedDateDDMMYYYY = date;
    console.log('Selected date (DD/MM/YYYY):', date);
  }

  onDateSelectedMMDDYYYY(date: Date) {
    this.selectedDateMMDDYYYY = date;
    console.log('Selected date (MM/DD/YYYY):', date);
  }

  onDateSelectedYYYYMMDD(date: Date) {
    this.selectedDateYYYYMMDD = date;
    console.log('Selected date (YYYY/MM/DD):', date);
  }

  onRangeSelectedDDMMYYYY(range: DateRange) {
    this.selectedRangeDDMMYYYY = range;
    console.log('Selected range (DD/MM/YYYY):', range);
  }

  onRangeSelectedMMDDYYYY(range: DateRange) {
    this.selectedRangeMMDDYYYY = range;
    console.log('Selected range (MM/DD/YYYY):', range);
  }

  onRangeSelectedYYYYMMDD(range: DateRange) {
    this.selectedRangeYYYYMMDD = range;
    console.log('Selected range (YYYY/MM/DD):', range);
  }

  // Function-based min/max examples for the datepicker
  minDateFn = (): Date => {
    const d = new Date();
    d.setDate(d.getDate() - 7); // 7 days ago
    return d;
  };

  maxDateFn = (): Date => {
    const d = new Date();
    d.setDate(d.getDate() + 7); // 7 days ahead
    return d;
  };

  openCalendar() {
    console.log('Button clicked - opening calendar');
    this.showButtonCalendar = true;
    console.log('showButtonCalendar set to:', this.showButtonCalendar);
  }

  onCalendarClosed() {
    this.showButtonCalendar = false;
  }

  // Error state methods
  toggleError() {
    this.showError = !this.showError;
    this.errorMessage = this.showError ? 'This field is required' : '';
  }

  // Clear error on date selection
  onDateSelect(date: Date) {
    this.dateValue = date;
    this.dateError = '';
  }

  setCustomError() {
    this.errorForm.patchValue({ customErrorDate: '' });
    // Trigger validation error
    this.errorForm.get('customErrorDate')?.setErrors({ custom: true });
    this.errorForm.get('customErrorDate')?.markAsTouched();
  }

  clearCustomError() {
    this.errorForm.get('customErrorDate')?.setErrors(null);
    this.errorForm.get('customErrorDate')?.markAsUntouched();
  }

  onErrorFormSubmit() {
    if (this.errorForm.valid) {
      console.log('Error form submitted:', this.errorForm.value);
    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.errorForm.controls).forEach(key => {
        this.errorForm.get(key)?.markAsTouched();
      });
    }
  }

  getRequiredDateError(): string {
    const control = this.errorForm.get('requiredDate');
    if (control?.hasError('required') && control?.touched) {
      return 'This date field is required';
    }
    return '';
  }

  getCustomErrorDateError(): string {
    const control = this.errorForm.get('customErrorDate');
    if (control?.hasError('custom') && control?.touched) {
      return 'Custom validation error message';
    }
    return '';
  }

}