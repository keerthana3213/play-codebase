import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPopoverDirective, AavaButtonComponent, PopOverData } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaPopoverDirective, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-content">
        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="samplePopoverData"
            [aavaPopoverPosition]="'top'"
            [aavaPopoverArrow]="'center'"
            [label]="'Show Popover'"
            [variant]="'primary'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="learnMorePopoverData"
            [aavaPopoverPosition]="'bottom'"
            [aavaPopoverArrow]="'center'"
            [aavaPopoverShowLearnMore]="true"
            [label]="'Show with Learn More'"
            [variant]="'secondary'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
        </div>

        <div class="demo-section">
          <aava-button
            aavaPopover
            [aavaPopoverData]="multiStepPopoverData"
            [aavaPopoverPosition]="'right'"
            [aavaPopoverArrow]="'center'"
            [aavaPopoverShowButtons]="true"
            [aavaPopoverShowPagination]="true"
            [label]="'Show Multi-step'"
            [variant]="'success'"
            [outlined]="true"
            pressedEffect="ripple"
          ></aava-button>
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
        margin-top: 50px;
      }

      .demo-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }

      .demo-section {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100px;
      }

      aava-button {
        margin-top: auto;
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  samplePopoverData: PopOverData[] = [
    {
      header: 'Welcome!',
      description: 'This is a simple popover with basic content.',
    },
  ];

  learnMorePopoverData: PopOverData[] = [
    {
      header: 'Learn More',
      description:
        'This popover includes a learn more link for additional information.',
      learnMoreUrl: 'https://example.com',
    },
  ];

  multiStepPopoverData: PopOverData[] = [
    {
      header: 'Step 1',
      description: 'This is the first step of the multi-step popover.',
    },
    {
      header: 'Step 2',
      description: 'This is the second step with additional information.',
    },
    {
      header: 'Step 3',
      description: 'This is the final step with completion details.',
    },
  ];
}
