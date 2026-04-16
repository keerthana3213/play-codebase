import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRatingComponent } from '@aava/play-core';

@Component({
  selector: 'ava-rating-readonly-demo',
  standalone: true,
  imports: [CommonModule, AavaRatingComponent],
  templateUrl: './readonly-demo.component.html',
  styleUrl: './readonly-demo.component.scss'
})
export class ReadonlyDemoComponent {
  constructor() {
    console.log('Readonly Demo Component loaded!');
  }
}
