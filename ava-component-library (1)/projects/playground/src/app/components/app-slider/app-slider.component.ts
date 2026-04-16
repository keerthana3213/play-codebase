import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaSliderComponent } from '@aava/play-core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'awe-app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaSliderComponent, FormsModule],
  templateUrl: './app-slider.component.html',
  styleUrls: [
    './app-slider.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppSliderComponent {
  // Sample data for quick demos
  selectedValue = 50;
  multiMinValue = 20;
  multiMaxValue = 80;

  // Simple example handlers
  onSliderChange(event: any) {
    this.selectedValue = event;
    console.log('Slider changed:', event);
  }

  onMultiMinChange(event: any) {
    this.multiMinValue = event;
    console.log('Multi min changed:', event);
  }

  onMultiMaxChange(event: any) {
    this.multiMaxValue = event;
    console.log('Multi max changed:', event);
  }

}
