import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRadioButtonComponent, RadioOption } from '@aava/play-core';

@Component({
  selector: 'ava-states-demo',
  standalone: true,
  imports: [CommonModule, AavaRadioButtonComponent],
  templateUrl: './states-demo.component.html',
  styleUrl: './states-demo.component.scss',
})
export class StatesDemoComponent {
  onSelectionChange(variant: string, value: string) {
    console.log(`${variant} state variant selection changed:`, value);
  }
}
