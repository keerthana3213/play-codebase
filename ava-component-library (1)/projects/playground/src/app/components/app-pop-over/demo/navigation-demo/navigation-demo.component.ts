import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPopOverComponent, PopOverConfig, PopOverData, AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'app-navigation-demo',
  standalone: true,
  imports: [CommonModule, AavaPopOverComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Navigation Variants</h2>
        <p>
          Multiple footer configurations for different use cases and user interaction patterns.
        </p>
      </div>

      <div class="demo-content">
        <div class="demo-section">
          <h3>Pagination Only</h3>
          <p>Simple page counter with navigation buttons.</p>
          <aava-button
            label="Show Pagination"
            variant="primary"
            (userClick)="showPaginationOnly()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Buttons Only</h3>
          <p>Navigation buttons without page counter.</p>
          <aava-button
            label="Show Buttons"
            variant="secondary"
            (userClick)="showButtonsOnly()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Pagination + Buttons</h3>
          <p>Full navigation with page counter and buttons.</p>
          <aava-button
            label="Show Full Navigation"
            variant="success"
            (userClick)="showFullNavigation()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Skip + Icon Navigation</h3>
          <p>Skip button with icon-based navigation.</p>
          <aava-button
            label="Show Skip + Icons"
            variant="warning"
            (userClick)="showSkipWithIcons()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Learn More Only</h3>
          <p>Single action button for additional information.</p>
          <aava-button
            label="Show Learn More"
            variant="info"
            (userClick)="showLearnMoreOnly()"
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
export class NavigationDemoComponent {
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

  showPaginationOnly() {
    this.popoverData = [
      {
        header: 'Step 1 of 3',
        description: 'This is the first step showing pagination only navigation.',
      },
      {
        header: 'Step 2 of 3',
        description: 'Second step with pagination counter.',
      },
      {
        header: 'Step 3 of 3',
        description: 'Final step with pagination display.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'top',
      arrow: 'center',
      left: 400,
      top: 250,
      width: 300,
      height: 50,
      showPagination: true,
    };
    this.showPopover = true;
  }

  showButtonsOnly() {
    this.popoverData = [
      {
        header: 'Navigation Buttons',
        description: 'This popover shows navigation buttons without pagination.',
      },
      {
        header: 'Second Page',
        description: 'Second page with button navigation.',
      },
      {
        header: 'Third Page',
        description: 'Third page with button navigation.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'bottom',
      arrow: 'center',
      left: 400,
      top: 350,
      width: 300,
      height: 50,
      showButtons: true,
    };
    this.showPopover = true;
  }

  showFullNavigation() {
    this.popoverData = [
      {
        header: 'Full Navigation - Step 1',
        description: 'Complete navigation with both pagination and buttons.',
      },
      {
        header: 'Full Navigation - Step 2',
        description: 'Second step with full navigation options.',
      },
      {
        header: 'Full Navigation - Step 3',
        description: 'Third step with complete navigation.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'right',
      arrow: 'center',
      left: 500,
      top: 200,
      width: 300,
      height: 50,
      showButtons: true,
      showPagination: true,
    };
    this.showPopover = true;
  }

  showSkipWithIcons() {
    this.popoverData = [
      {
        header: 'Skip + Icons - Step 1',
        description: 'Navigation with skip button and icon navigation.',
      },
      {
        header: 'Skip + Icons - Step 2',
        description: 'Second step with skip and icon options.',
      },
      {
        header: 'Skip + Icons - Step 3',
        description: 'Third step with skip and icon navigation.',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'left',
      arrow: 'center',
      left: 300,
      top: 200,
      width: 300,
      height: 50,
      showButtons: true,
      showIcon: true,
      showSkip: true,
    };
    this.showPopover = true;
  }

  showLearnMoreOnly() {
    this.popoverData = [
      {
        header: 'Learn More',
        description: 'This popover shows only a learn more button for additional information.',
        learnMoreUrl: 'https://example.com/learn-more',
      },
    ];
    this.popoverConfig = {
      ...this.popoverConfig,
      position: 'top',
      arrow: 'center',
      left: 400,
      top: 250,
      width: 300,
      height: 50,
      showLearnMore: true,
    };
    this.showPopover = true;
  }
}
