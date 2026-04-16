import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'ava-multi-range-demo',
  standalone: true,
  imports: [CommonModule, AavaSliderComponent],
  templateUrl: './multi-range-demo.component.html',
  styleUrls: ['./multi-range-demo.component.scss'],
})
export class MultiRangeDemoComponent {
  minValue = 20;
  maxValue = 80;

  onMinChange(value: number) {
    this.minValue = value;
    console.log('Min value changed:', value);
  }

  onMaxChange(value: number) {
    this.maxValue = value;
    console.log('Max value changed:', value);
  }
}
