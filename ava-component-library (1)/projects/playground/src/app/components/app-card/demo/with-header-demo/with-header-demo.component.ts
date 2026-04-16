import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaIconComponent,
  AavaDefaultCardComponent,
  AavaCardHeaderComponent,
  AavaCardContentComponent,
} from '@aava/play-core'

@Component({
  selector: 'ava-card-with-header-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaIconComponent,
    AavaDefaultCardComponent,
    AavaCardHeaderComponent,
    AavaCardContentComponent,
  ],
  templateUrl: './with-header-demo.component.html',
  styleUrl: './with-header-demo.component.scss',
})
export class WithHeaderDemoComponent {
  onActionClick(action: string) {
    console.log(`${action} action clicked!`);
  }

  onNotificationClick() {
    console.log('Notification clicked!');
  }

  onShareClick() {
    console.log('Share clicked!');
  }
}
