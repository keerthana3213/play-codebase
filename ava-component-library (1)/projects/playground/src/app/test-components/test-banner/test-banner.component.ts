import { Component } from '@angular/core';
import { AavaBannerComponent } from '@aava/play-core';
@Component({
  selector: 'app-test-banner',
  imports: [AavaBannerComponent],
  standalone: true,
  templateUrl: './test-banner.component.html',
  styleUrl: './test-banner.component.scss'
})
export class TestBannerComponent {

  onUpgrade() {

  }

  handleDiscoverMore() {

  }
  doSecondary() {

  }
  doPrimary() {

  }
}
