import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRadioButtonComponent, RadioOption } from '@aava/play-core';

@Component({
  selector: 'ava-orientations-demo',
  standalone: true,
  imports: [CommonModule, AavaRadioButtonComponent],
  templateUrl: './orientations-demo.component.html',
  styleUrl: './orientations-demo.component.scss',
})
export class OrientationsDemoComponent {
  verticalValue = '';
  horizontalValue = '';

  orientationOptions: RadioOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  onSelectionChange(orientation: string, value: string) {
    console.log(`${orientation} orientation selection changed:`, value);
  }
}
