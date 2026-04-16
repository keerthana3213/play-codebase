import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSliderComponent } from '@aava/play-core';

@Component({
  selector: 'ava-slider-basic-demo',
  standalone: true,
  imports: [CommonModule, AavaSliderComponent],
  templateUrl: './slider-basic-demo.component.html',
  styleUrls: ['./slider-basic-demo.component.scss'],
})
export class SliderBasicDemoComponent {

}
