import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaRadioButtonComponent,
  RadioOption,
} from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaRadioButtonComponent],
  templateUrl:'./basic-usage-demo.component.html',
  styleUrl:'./basic-usage-demo.component.scss'

})
export class BasicUsageDemoComponent {
  onSelectionChange(value: string) {
    console.log('Radio button selection changed:', value);
  }
}
