import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-masking-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-masking-demo.component.html',
  styleUrls: ['./textbox-masking-demo.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TextboxMaskingDemoComponent {
  phoneValue = '';
  currencyValue = '';
  dateValue = '';
  customValue = '';

  maskPhone = '(000) 000-0000';
  maskCurrency = 'separator.2';
  thousand: ',' | '' = ',';
  decimal: '.' | ',' | ['.', ','] = '.';

  maskDate = '00/00/0000';

  customMask = 'SS-0000';
  customPatterns: Record<string, { pattern: RegExp }> = {
    S: { pattern: /[A-Za-z]/ },
    '0': { pattern: /\d/ },
  };

  // Country phone number with dropdown
  countryPhoneValue = '';

  // Country options with their respective phone masks
  countryOptions = [
    {
      label: 'US +1',
      value: 'us',
      mask: '(000) 000-0000',
      placeholder: '(123) 456-7890',
    },
    {
      label: 'IN +91',
      value: 'in',
      mask: '00000 00000',
      placeholder: '98765 43210',
    },
    {
      label: 'UK +44',
      value: 'uk',
      mask: '00000 000000',
      placeholder: '20123 456789',
    },
  ];

  selectedCountry = this.countryOptions[0]; // Default to US

  // Get current country mask
  get currentCountryMask(): string {
    return this.selectedCountry.mask;
  }

  // Get current country placeholder
  get currentCountryPlaceholder(): string {
    return this.selectedCountry.placeholder;
  }

  // Handle country selection
  onCountrySelect(option: { label: string; value: string }): void {
    const country = this.countryOptions.find((c) => c.value === option.value);
    if (country) {
      this.selectedCountry = country;
      // Clear the phone value when switching countries
      this.countryPhoneValue = '';
    }
  }

  // Approach 1: Using Slots (ng-content projection)
  slotCountryPhoneValue = '';
  slotSelectedCountryCode = 'us';
  slotIsDropdownOpen = false;

  get slotSelectedCountry() {
    return (
      this.countryOptions.find(
        (c) => c.value === this.slotSelectedCountryCode
      ) || this.countryOptions[0]
    );
  }

  get slotCurrentMask(): string {
    return this.slotSelectedCountry.mask;
  }

  get slotCurrentPlaceholder(): string {
    return this.slotSelectedCountry.placeholder;
  }

  toggleSlotDropdown(): void {
    this.slotIsDropdownOpen = !this.slotIsDropdownOpen;
  }

  selectSlotCountry(option: {
    label: string;
    value: string;
    mask: string;
    placeholder: string;
  }): void {
    this.slotSelectedCountryCode = option.value;
    this.slotIsDropdownOpen = false;
    this.slotCountryPhoneValue = ''; // Clear value when country changes
  }

  closeSlotDropdown(): void {
    if (this.slotIsDropdownOpen) {
      this.slotIsDropdownOpen = false;
    }
  }
}
