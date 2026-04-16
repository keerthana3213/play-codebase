import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPopOverComponent, PopOverConfig, PopOverData, AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'app-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaPopOverComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Footer Variants</h2>
        <p>
          Multiple footer configurations to match different interaction patterns and design requirements.
        </p>
      </div>

      <div class="demo-content">
        <div class="demo-section">
          <h3>Default Footer</h3>
          <p>Standard pagination with navigation buttons.</p>
          <aava-button
            label="Show Default"
            variant="primary"
            (userClick)="showDefaultFooter()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Learn More Only</h3>
          <p>Single action button for additional information.</p>
          <aava-button
            label="Show Learn More"
            variant="secondary"
            (userClick)="showLearnMoreFooter()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Buttons Only</h3>
          <p>Navigation buttons without page counter.</p>
          <aava-button
            label="Show Buttons"
            variant="success"
            (userClick)="showButtonsFooter()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Pagination + Buttons</h3>
          <p>Full navigation with page counter and buttons.</p>
          <aava-button
            label="Show Full Navigation"
            variant="warning"
            (userClick)="showFullNavigationFooter()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Skip + Icon Navigation</h3>
          <p>Skip button with icon-based navigation.</p>
          <aava-button
            label="Show Skip + Icons"
            variant="info"
            (userClick)="showSkipWithIconsFooter()"
          ></aava-button>
        </div>
      </div>

      <aava-pop-over
        [config]="popoverConfig"
        [data]="popoverData"
        *ngIf="showPopover"
      ></aava-pop-over>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
      }

      .demo-header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .demo-header h2 {
        color: var(--color-text-primary);
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      .demo-header p {
        color: var(--color-text-secondary);
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }

      .demo-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }

      .demo-section {
        background: var(--color-background-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 1.5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }

      .demo-section h3 {
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
      }

      .demo-section p {
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
export class VariantsDemoComponent {
  showPopover = false;
  popoverConfig: PopOverConfig = {
    position: 'top',
    arrow: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    showButtons: false,
    showPagination: false,
    showIcon: false,
    showSkip: false,
    showLearnMore: false,
  };
  popoverData: PopOverData[] = [];

  showDefaultFooter() {
    this.popoverData = [
      {
        header: 'Default Footer - Step 1',
        description: 'This popover shows the default footer with standard pagination and navigation buttons.',
      },
      {
        header: 'Default Footer - Step 2',
        description: 'Second step demonstrating the default footer configuration.',
      },
      {
        header: 'Default Footer - Step 3',
        description: 'Final step with default footer layout.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'top',
      arrow: 'center',
      left: 400,
      top: 250,
      width: 350,
      height: 50,
      showButtons: true,
      showPagination: true,
    };
    this.showPopover = true;
  }

  showLearnMoreFooter() {
    this.popoverData = [
      {
        header: 'Learn More Footer',
        description: 'This popover demonstrates a footer with only a learn more button for additional information.',
        learnMoreUrl: 'https://example.com/learn-more',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'bottom',
      arrow: 'center',
      left: 400,
      top: 350,
      width: 350,
      height: 50,
      showLearnMore: true,
    };
    this.showPopover = true;
  }

  showButtonsFooter() {
    this.popoverData = [
      {
        header: 'Buttons Footer - Step 1',
        description: 'This popover shows navigation buttons without pagination counter.',
      },
      {
        header: 'Buttons Footer - Step 2',
        description: 'Second step with button-only navigation.',
      },
      {
        header: 'Buttons Footer - Step 3',
        description: 'Third step with button navigation.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'right',
      arrow: 'center',
      left: 500,
      top: 200,
      width: 350,
      height: 50,
      showButtons: true,
    };
    this.showPopover = true;
  }

  showFullNavigationFooter() {
    this.popoverData = [
      {
        header: 'Full Navigation - Step 1',
        description: 'Complete navigation footer with both pagination and navigation buttons.',
      },
      {
        header: 'Full Navigation - Step 2',
        description: 'Second step with full navigation options.',
      },
      {
        header: 'Full Navigation - Step 3',
        description: 'Third step with complete navigation footer.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'left',
      arrow: 'center',
      left: 300,
      top: 200,
      width: 350,
      height: 50,
      showButtons: true,
      showPagination: true,
    };
    this.showPopover = true;
  }

  showSkipWithIconsFooter() {
    this.popoverData = [
      {
        header: 'Skip + Icons - Step 1',
        description: 'Footer with skip button and icon-based navigation for guided tours.',
      },
      {
        header: 'Skip + Icons - Step 2',
        description: 'Second step with skip and icon navigation options.',
      },
      {
        header: 'Skip + Icons - Step 3',
        description: 'Third step with skip and icon navigation footer.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'top',
      arrow: 'center',
      left: 400,
      top: 250,
      width: 350,
      height: 50,
      showButtons: true,
      showIcon: true,
      showSkip: true,
    };
    this.showPopover = true;
  }
}
