import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaRadioButtonComponent,
  RadioOption,
} from '@aava/play-core';

@Component({
  selector: 'ava-animations-demo',
  standalone: true,
  imports: [CommonModule, AavaRadioButtonComponent],
  templateUrl:'./animations-demo.component.html',
  styleUrl:'./animations-demo.component.scss'

})
export class AnimationsDemoComponent {
  noAnimationValue = '';
  shadowAnimationValue = '';
  customShadowValue = '';

  animationOptions: RadioOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];

  onSelectionChange(variant: string, value: string) {
    console.log(`${variant} animation variant selection changed:`, value);
  }
}
