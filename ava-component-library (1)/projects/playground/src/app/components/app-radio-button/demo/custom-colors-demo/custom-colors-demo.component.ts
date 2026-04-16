import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRadioButtonComponent, RadioOption } from '@aava/play-core';

@Component({
  selector: 'ava-custom-colors-demo',
  standalone: true,
  imports: [CommonModule, AavaRadioButtonComponent],
  templateUrl: './custom-colors-demo.component.html',
  styleUrl: './custom-colors-demo.component.scss',
})
export class CustomColorsDemoComponent {
  onSelectionChange(variant: string, value: string) {
    console.log(`${variant} color variant selection changed:`, value);
  }
}
