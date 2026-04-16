import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-slider',
  imports: [AavaSliderComponent, ReactiveFormsModule],
  templateUrl: './test-slider.component.html',
  styleUrl: './test-slider.component.scss'
})
export class TestSliderComponent {
  // Basic slider values
  basicValue = 30;
  volumeValue = 50;

  // Input type slider values
  defaultTypeValue = 25;
  inputTypeValue = 75;
  inputTypeSmallValue = 40;
  inputTypeMediumValue = 60;

  onBasicValueChange(value: number): void {
    this.basicValue = value;
  }

  onVolumeChange(value: number): void {
    this.volumeValue = value;
  }

  onDefaultTypeChange(value: number): void {
    this.defaultTypeValue = value;
    console.log('Default type value:', value);
  }

  onInputTypeChange(value: number): void {
    this.inputTypeValue = value;
    console.log('Input type value:', value);
  }

  onInputTypeSmallChange(value: number): void {
    this.inputTypeSmallValue = value;
    console.log('Input type small value:', value);
  }

  onInputTypeMediumChange(value: number): void {
    this.inputTypeMediumValue = value;
    console.log('Input type medium value:', value);
  }
}
