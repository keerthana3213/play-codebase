import { AavaButtonComponent, AavaCheckboxComponent, AavaSelectComponent, 
  AavaSelectOptionComponent, AavaTextareaComponent, AavaToggleComponent } from '@aava/play-core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '../../../../../play-core/src/public-api';

@Component({
  selector: 'app-test-form-control',
  imports: [ReactiveFormsModule, 
    AavaButtonComponent ,AavaTextboxComponent, 
    AavaSelectComponent, AavaSelectOptionComponent
    ,AavaCheckboxComponent,AavaToggleComponent,AavaTextareaComponent
  ],
  templateUrl: './test-form-control.component.html',
  styleUrl: './test-form-control.component.scss'
})
export class TestFormControlComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      textbox: ['John',],
      select: ['2', ],
      checkbox:[false],
      toggle:[false],
      textarea:'David',
      phoneMask:'121212212'
     
    });
  }

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
countryPhoneValue = '';
  get currentCountryMask(): string {
    return this.selectedCountry.mask;
  }
    onCountrySelect(option: { label: string; value: string }): void {
    const country = this.countryOptions.find((c) => c.value === option.value);
    if (country) {
      this.selectedCountry = country;
      // Clear the phone value when switching countries
      this.countryPhoneValue = '';
    }
  }
    get currentCountryPlaceholder(): string {
    return this.selectedCountry.placeholder;
  }
  patch(){
    this.form.patchValue({
      textbox:'James',
      select:"3",
      checkbox:true,
      toggle:true,
       textarea:'Decruz',
        phoneMask:'123456432'
    })
  }
}
