import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
} from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaDrawerComponent, AavaButtonComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrl: './sizes-demo.component.scss',
})
export class SizesDemoComponent {
  // Drawer states for different sizes
  smallDrawerOpen = false;
  mediumDrawerOpen = false;
  largeDrawerOpen = false;
  extraLargeDrawerOpen = false;
  fullDrawerOpen = false;

  openDrawer(size: string): void {
    switch (size) {
      case 'small':
        this.smallDrawerOpen = true;
        break;
      case 'medium':
        this.mediumDrawerOpen = true;
        break;
      case 'large':
        this.largeDrawerOpen = true;
        break;
      case 'extra-large':
        this.extraLargeDrawerOpen = true;
        break;
      case 'full':
        this.fullDrawerOpen = true;
        break;
    }
  }

  closeDrawer(size: string): void {
    switch (size) {
      case 'small':
        this.smallDrawerOpen = false;
        break;
      case 'medium':
        this.mediumDrawerOpen = false;
        break;
      case 'large':
        this.largeDrawerOpen = false;
        break;
      case 'extra-large':
        this.extraLargeDrawerOpen = false;
        break;
      case 'full':
        this.fullDrawerOpen = false;
        break;
    }
  }
}
