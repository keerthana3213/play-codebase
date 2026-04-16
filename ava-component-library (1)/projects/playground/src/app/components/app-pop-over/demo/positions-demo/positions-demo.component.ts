import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPopoverDirective, PopOverData, AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-positions-demo',
  standalone: true,
  imports: [CommonModule, AavaPopoverDirective, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-content">
        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="topPopoverData"
            [aavaPopoverPosition]="'top'"
            [aavaPopoverArrow]="'center'"
            [label]="'Show Top'"
            [variant]="'primary'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="bottomPopoverData"
            [aavaPopoverPosition]="'bottom'"
            [aavaPopoverArrow]="'center'"
            [label]="'Show Bottom'"
            [variant]="'secondary'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="leftPopoverData"
            [aavaPopoverPosition]="'left'"
            [aavaPopoverArrow]="'center'"
            [label]="'Show Left'"
            [variant]="'success'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="rightPopoverData"
            [aavaPopoverPosition]="'right'"
            [aavaPopoverArrow]="'center'"
            [label]="'Show Right'"
            [variant]="'warning'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
        </div>
      </div>

      <div class="arrow-alignment-section">
        <div class="arrow-grid">
          <div class="arrow-item">
            <aava-button
              aavaPopover
              [aavaPopoverData]="startArrowPopoverData"
              [aavaPopoverPosition]="'top'"
              [aavaPopoverArrow]="'start'"
              [label]="'Start Arrow'"
              [variant]="'info'"
              [outlined]="true"
              pressedEffect="ripple"
            ></aava-button>
          </div>
          <div class="arrow-item">
            <aava-button
              aavaPopover
              [aavaPopoverData]="centerArrowPopoverData"
              [aavaPopoverPosition]="'top'"
              [aavaPopoverArrow]="'center'"
              [label]="'Center Arrow'"
              [variant]="'primary'"
              [outlined]="true"
              pressedEffect="ripple"
            ></aava-button>
          </div>
          <div class="arrow-item">
            <aava-button
              aavaPopover
              [aavaPopoverData]="endArrowPopoverData"
              [aavaPopoverPosition]="'top'"
              [aavaPopoverArrow]="'end'"
              [label]="'End Arrow'"
              [variant]="'secondary'"
              [outlined]="true"
              pressedEffect="ripple"
            ></aava-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }

      .demo-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .demo-section {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }

      .arrow-alignment-section {
        margin-bottom: 2rem;
      }

      .arrow-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }

      .arrow-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }

      .arrow-item p {
        color: var(--color-text-secondary);
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      aava-button {
        margin-top: auto;
      }
    `,
  ],
})
export class PositionsDemoComponent {
  topPopoverData: PopOverData[] = [
    {
      header: 'Top Position',
      description:
        'This popover appears above the target element with a downward arrow.',
    },
  ];

  bottomPopoverData: PopOverData[] = [
    {
      header: 'Bottom Position',
      description:
        'This popover appears below the target element with an upward arrow.',
    },
  ];

  leftPopoverData: PopOverData[] = [
    {
      header: 'Left Position',
      description:
        'This popover appears to the left of the target element with a rightward arrow.',
    },
  ];

  rightPopoverData: PopOverData[] = [
    {
      header: 'Right Position',
      description:
        'This popover appears to the right of the target element with a leftward arrow.',
    },
  ];

  startArrowPopoverData: PopOverData[] = [
    {
      header: 'Start Arrow',
      description: 'Arrow positioned at the beginning of the popover.',
    },
  ];

  centerArrowPopoverData: PopOverData[] = [
    {
      header: 'Center Arrow',
      description: 'Arrow centered on the popover (default).',
    },
  ];

  endArrowPopoverData: PopOverData[] = [
    {
      header: 'End Arrow',
      description: 'Arrow positioned at the end of the popover.',
    },
  ];
}
