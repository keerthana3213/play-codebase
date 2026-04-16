import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'ava-slider-input-variant-demo',
  standalone: true,
  imports: [CommonModule, AavaSliderComponent],
  templateUrl: './slider-input-variant-demo.component.html',
  styleUrls: ['./slider-input-variant-demo.component.scss'],
})
export class SliderInputVariantDemoComponent {
  currentValue = 50;

  onSliderChange(value: number) {
    this.currentValue = value;
    console.log('Slider value:', value);
  }
}
