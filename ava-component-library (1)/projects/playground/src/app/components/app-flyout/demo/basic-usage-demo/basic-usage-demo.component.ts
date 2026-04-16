import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFlyoutComponent } from '@aava/play-core';

@Component({
    selector: 'ava-flyout-basic-usage-demo',
    standalone: true,
    imports: [CommonModule, AavaFlyoutComponent],
    template: `
    <div class="demo-section center-demo">
      <div class="flyout-container">
        <button #trigger (click)="flyout.open(trigger)" class="demo-button">
          Open Basic Flyout
        </button>
        <aava-flyout #flyout>
          <div class="flyout-content">
            <h3>Basic Flyout</h3>
            <p>This is a simple flyout with default settings.</p>
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
        padding: 1rem;
        min-width: 200px;
      }
      .demo-button {
        padding: 0.5rem 1rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
    ],
})
export class FlyoutBasicUsageDemoComponent { }
