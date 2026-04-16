import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'ava-slider-orientation-demo',
  standalone: true,
  imports: [CommonModule, AavaSliderComponent],
  templateUrl: './slider-orientation-demo.component.html',
  styleUrls: ['./slider-orientation-demo.component.scss'],
})
export class SliderOrientationDemoComponent {
  currentValue = 50;

  onSliderChange(value: number) {
    this.currentValue = value;
    console.log('Slider value:', value);
  }
}
