import { Component } from '@angular/core';
import { AavaRatingComponent } from '@aava/play-core';
@Component({
  selector: 'app-test-rating',
  imports: [AavaRatingComponent],
  templateUrl: './test-rating.component.html',
  styleUrl: './test-rating.component.scss'
})
export class TestRatingComponent {

  onRated(value: number) {
    console.log(value);
  }
}
