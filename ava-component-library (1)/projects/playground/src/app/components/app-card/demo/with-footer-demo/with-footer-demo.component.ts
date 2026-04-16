import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaButtonComponent, AavaIconComponent,
  AavaDefaultCardComponent,
  AavaCardHeaderComponent,
  AavaCardContentComponent,
  AavaCardFooterComponent,
  AavaTagComponent
} from '@aava/play-core'

@Component({
  selector: 'ava-card-with-footer-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    AavaIconComponent,
    AavaDefaultCardComponent,
    AavaCardHeaderComponent,
    AavaCardContentComponent,
    AavaCardFooterComponent,
    AavaTagComponent
  ],
  templateUrl: './with-footer-demo.component.html',
  styleUrl: './with-footer-demo.component.scss',
})
export class WithFooterDemoComponent {
  onFooterAction(action: string) {
    console.log(`Footer action: ${action}`);
  }

  onLike() {
    console.log('Liked!');
  }

  onShare() {
    console.log('Shared!');
  }

  onComment() {
    console.log('Comment clicked!');
  }
}
