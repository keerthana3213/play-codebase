import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
} from '@aava/play-core';

@Component({
  selector: 'ava-behavior-demo',
  standalone: true,
  imports: [CommonModule, AavaDrawerComponent, AavaButtonComponent],
  templateUrl: './behavior-demo.component.html',
  styleUrl: './behavior-demo.component.scss',
})
export class BehaviorDemoComponent {
  // Behavior property examples
  overlayTrueDrawerOpen = false;
  overlayFalseDrawerOpen = false;
  overlayClickTrueDrawerOpen = false;
  overlayClickFalseDrawerOpen = false;
  escapeTrueDrawerOpen = false;
  escapeFalseDrawerOpen = false;
  closeButtonTrueDrawerOpen = false;
  closeButtonFalseDrawerOpen = false;
  persistentFalseDrawerOpen = false;
  persistentTrueDrawerOpen = false;
  animateTrueDrawerOpen = false;
  animateFalseDrawerOpen = false;

  openDrawer(type: string): void {
    switch (type) {
      case 'overlay-true':
        this.overlayTrueDrawerOpen = true;
        break;
      case 'overlay-false':
        this.overlayFalseDrawerOpen = true;
        break;
      case 'overlay-click-true':
        this.overlayClickTrueDrawerOpen = true;
        break;
      case 'overlay-click-false':
        this.overlayClickFalseDrawerOpen = true;
        break;
      case 'escape-true':
        this.escapeTrueDrawerOpen = true;
        break;
      case 'escape-false':
        this.escapeFalseDrawerOpen = true;
        break;
      case 'close-button-true':
        this.closeButtonTrueDrawerOpen = true;
        break;
      case 'close-button-false':
        this.closeButtonFalseDrawerOpen = true;
        break;
      case 'persistent-false':
        this.persistentFalseDrawerOpen = true;
        break;
      case 'persistent-true':
        this.persistentTrueDrawerOpen = true;
        break;
      case 'animate-true':
        this.animateTrueDrawerOpen = true;
        break;
      case 'animate-false':
        this.animateFalseDrawerOpen = true;
        break;
    }
  }

  closeDrawer(type: string): void {
    switch (type) {
      case 'overlay-true':
        this.overlayTrueDrawerOpen = false;
        break;
      case 'overlay-false':
        this.overlayFalseDrawerOpen = false;
        break;
      case 'overlay-click-true':
        this.overlayClickTrueDrawerOpen = false;
        break;
      case 'overlay-click-false':
        this.overlayClickFalseDrawerOpen = false;
        break;
      case 'escape-true':
        this.escapeTrueDrawerOpen = false;
        break;
      case 'escape-false':
        this.escapeFalseDrawerOpen = false;
        break;
      case 'close-button-true':
        this.closeButtonTrueDrawerOpen = false;
        break;
      case 'close-button-false':
        this.closeButtonFalseDrawerOpen = false;
        break;
      case 'persistent-false':
        this.persistentFalseDrawerOpen = false;
        break;
      case 'persistent-true':
        this.persistentTrueDrawerOpen = false;
        break;
      case 'animate-true':
        this.animateTrueDrawerOpen = false;
        break;
      case 'animate-false':
        this.animateFalseDrawerOpen = false;
        break;
    }
  }
}
