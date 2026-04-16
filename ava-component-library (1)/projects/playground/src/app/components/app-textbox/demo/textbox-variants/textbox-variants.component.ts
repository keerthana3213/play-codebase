import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-variants',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-variants.component.html',
  styleUrls: ['./textbox-variants.component.scss'],
})
export class TextboxVariantsComponent {
  defaultValue = '';
  primaryValue = '';
  successValue = '';
  errorValue = '';
  warningValue = '';
  infoValue = '';

  onDefaultChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Default variant value changed:', target.value);
  }

  onPrimaryChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Primary variant value changed:', target.value);
  }

  onSuccessChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Success variant value changed:', target.value);
  }

  onErrorChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Error variant value changed:', target.value);
  }

  onWarningChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Warning variant value changed:', target.value);
  }

  onInfoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Info variant value changed:', target.value);
  }
}
