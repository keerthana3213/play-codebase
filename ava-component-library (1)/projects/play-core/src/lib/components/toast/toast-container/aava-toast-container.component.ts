import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastPosition } from '../aava-toast.service';

@Component({
  selector: 'aava-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ava-toast-container" [ngClass]="positionClass">
      <ng-container #container></ng-container>
    </div>
  `,
  styles: [`
    /* Toast Container - Uses only _toast.css token variables */
    .ava-toast-container {
      position: var(--toast-container-position);
      z-index: var(--toast-container-z-index);
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: var(--toast-gap);
      max-width: calc(100vw - 40px);
      width: auto;
    }

    .ava-toast-container.top-left {
      top: var(--toast-padding);
      left: var(--toast-padding);
    }

    .ava-toast-container.top-center {
      top: var(--toast-padding);
      left: 50%;
      transform: translateX(-50%);
    }

    .ava-toast-container.top-right {
      top: var(--toast-padding);
      right: var(--toast-padding);
      align-items: flex-end;
    }

    .ava-toast-container.bottom-left {
      bottom: var(--toast-padding);
      left: var(--toast-padding);
    }

    .ava-toast-container.bottom-center {
      bottom: var(--toast-padding);
      left: 50%;
      transform: translateX(-50%);
    }

    .ava-toast-container.bottom-right {
      bottom: var(--toast-padding);
      right: var(--toast-padding);
      align-items: flex-end;
    }

    @media (max-width: 768px) {
      .ava-toast-container {
        max-width: calc(100vw - 40px);
        width: calc(100vw - 40px);
        left: var(--toast-padding) !important;
        right: var(--toast-padding) !important;
        transform: none !important;
      }
    }


  `]
})
export class AavaToastContainerComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  positionClass = 'top-right';

  setPosition(position: ToastPosition) {
    this.positionClass = position;
  }
}
