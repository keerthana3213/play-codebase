import { Component } from '@angular/core';
import { AavaAvatarsComponent } from '@aava/play-core';


@Component({
  selector: 'app-test-avatars',
  imports: [AavaAvatarsComponent],
  templateUrl: './test-avatars.component.html',
  styleUrl: './test-avatars.component.scss'
})
export class TestAvatarsComponent {
  sampleImageUrl = 'assets/1.svg';
}
