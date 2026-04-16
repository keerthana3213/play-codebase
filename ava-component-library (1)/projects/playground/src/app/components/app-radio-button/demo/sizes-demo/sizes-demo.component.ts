import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRadioButtonComponent, RadioOption } from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaRadioButtonComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrl: './sizes-demo.component.scss',
})
export class SizesDemoComponent {
  onSelectionChange(size: string, value: string) {
    console.log(`${size} size selection changed:`, value);
  }
}
