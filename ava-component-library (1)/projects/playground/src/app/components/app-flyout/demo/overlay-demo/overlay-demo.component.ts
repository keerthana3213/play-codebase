import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFlyoutComponent } from '@aava/play-core';

@Component({
    selector: 'ava-flyout-overlay-demo',
    standalone: true,
    imports: [CommonModule, AavaFlyoutComponent],
    template: `
    <div class="demo-section center-demo">
      <div class="flyout-container">
        <button #trigger (click)="flyout.open(trigger)" class="demo-button">
          Open with Overlay
        </button>
        <aava-flyout #flyout [overlay]="true" [closeOnOverlayClick]="true">
          <div class="flyout-content">
            <h3>Modal-like Flyout</h3>
            <p>This flyout has an overlay background.</p>
            <button (click)="flyout.close()">Close</button>
          </div>
        </aava-flyout>
      </div>
    </div>
  `,
    styles: [
        `
      .center-demo {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }
      .flyout-content {
        padding: 1.5rem;
        min-width: 250px;
      }
      .demo-button {
        padding: 0.5rem 1rem;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
    ],
})
export class FlyoutOverlayDemoComponent { }
