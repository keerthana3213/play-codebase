import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-basic-usage',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-basic-usage.component.html',
  styleUrls: ['./textbox-basic-usage.component.scss'],
})
export class TextboxBasicUsageComponent {
  basicValue = '';
  emailValue = '';
  disabledValue = 'Disabled input';
  readonlyValue = 'Read only value';

  onBasicChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Basic textbox value changed:', target.value);
  }

  onEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Email textbox value changed:', target.value);
  }
}
