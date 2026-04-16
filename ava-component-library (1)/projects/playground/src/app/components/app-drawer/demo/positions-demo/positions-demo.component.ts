import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
} from '@aava/play-core';

@Component({
  selector: 'ava-positions-demo',
  standalone: true,
  imports: [CommonModule, AavaDrawerComponent, AavaButtonComponent],
  templateUrl: './positions-demo.component.html',
  styleUrl: './positions-demo.component.scss',
})
export class PositionsDemoComponent {
  // Drawer states for different positions
  rightDrawerOpen = false;
  leftDrawerOpen = false;
  topDrawerOpen = false;
  bottomDrawerOpen = false;

  openDrawer(position: string): void {
    switch (position) {
      case 'right':
        this.rightDrawerOpen = true;
        break;
      case 'left':
        this.leftDrawerOpen = true;
        break;
      case 'top':
        this.topDrawerOpen = true;
        break;
      case 'bottom':
        this.bottomDrawerOpen = true;
        break;
    }
  }

  closeDrawer(position: string): void {
    switch (position) {
      case 'right':
        this.rightDrawerOpen = false;
        break;
      case 'left':
        this.leftDrawerOpen = false;
        break;
      case 'top':
        this.topDrawerOpen = false;
        break;
      case 'bottom':
        this.bottomDrawerOpen = false;
        break;
    }
  }
}
