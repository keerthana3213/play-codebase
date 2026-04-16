import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFlyoutComponent, FlyoutAlignment } from '@aava/play-core';

@Component({
    selector: 'ava-flyout-alignment-demo',
    standalone: true,
    imports: [CommonModule, AavaFlyoutComponent],
    template: `
    <div class="demo-section center-demo">
      <div class="alignment-grid">
        <div class="flyout-container" *ngFor="let align of alignments">
          <button #btn (click)="f.open(btn)" class="demo-button">
            Align: {{ align }}
          </button>
          <aava-flyout #f [alignment]="align">
            <div class="flyout-content">
              <p>Aligned to <strong>{{ align }}</strong></p>
            </div>
          </aava-flyout>
        </div>
      </div>
    </div>
  `,
    styles: [
        `
      .center-demo {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
      }
      .alignment-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      .flyout-content {
        padding: 1rem;
      }
      .demo-button {
        padding: 0.5rem 1rem;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
      }
    `,
    ],
})
export class FlyoutAlignmentDemoComponent {
    alignments: FlyoutAlignment[] = ['left', 'right', 'top', 'bottom'];
}
