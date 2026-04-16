import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icon-thumb-demo',
  standalone: true,
  imports: [CommonModule, AavaSliderComponent],
  templateUrl: './icon-thumb-demo.component.html',
  styleUrls: ['./icon-thumb-demo.component.scss'],
})
export class IconThumbDemoComponent {
  currentValue = 50;

  onSliderChange(value: number) {
    this.currentValue = value;
    console.log('Slider value:', value);
  }
}
