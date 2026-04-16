import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'ava-slider-states-demo',
  standalone: true,
  imports: [CommonModule, AavaSliderComponent],
  templateUrl: './slider-states-demo.component.html',
  styleUrls: ['./slider-states-demo.component.scss'],
})
export class SliderStatesDemoComponent {
  currentValue = 50;

  onSliderChange(value: number) {
    this.currentValue = value;
    console.log('Slider value:', value);
  }
}
