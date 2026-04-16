import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPopOverComponent, PopOverConfig, PopOverData, AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'app-content-demo',
  standalone: true,
  imports: [CommonModule, AavaPopOverComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Content Variants</h2>
        <p>
          Different content configurations for various use cases and information display needs.
        </p>
      </div>

      <div class="demo-content">
        <div class="demo-section">
          <h3>Header + Description</h3>
          <p>Structured information display with clear hierarchy.</p>
          <aava-button
            label="Show Structured"
            variant="primary"
            (userClick)="showStructuredContent()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Learn More Links</h3>
          <p>Optional URLs for additional information and resources.</p>
          <aava-button
            label="Show with Links"
            variant="secondary"
            (userClick)="showLearnMoreContent()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Multi-page Content</h3>
          <p>Support for guided tours and step-by-step help.</p>
          <aava-button
            label="Show Multi-page"
            variant="success"
            (userClick)="showMultiPageContent()"
          ></aava-button>
        </div>

        <div class="demo-section">
          <h3>Custom Styling</h3>
          <p>CSS custom properties for theming and customization.</p>
          <aava-button
            label="Show Custom Style"
            variant="warning"
            (userClick)="showCustomStyledContent()"
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
export class ContentDemoComponent {
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

  showStructuredContent() {
    this.popoverData = [
      {
        header: 'Welcome to Our Platform',
        description: 'This is a well-structured popover with a clear header and descriptive content that provides users with essential information.',
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
    };
    this.showPopover = true;
  }

  showLearnMoreContent() {
    this.popoverData = [
      {
        header: 'Advanced Features',
        description: 'Discover our advanced features and capabilities. Click learn more to explore detailed documentation and tutorials.',
        learnMoreUrl: 'https://example.com/advanced-features',
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

  showMultiPageContent() {
    this.popoverData = [
      {
        header: 'Getting Started - Step 1',
        description: 'Welcome! This is the first step of your guided tour. We\'ll walk you through the essential features.',
      },
      {
        header: 'Getting Started - Step 2',
        description: 'Great! Now let\'s explore the main dashboard and understand how to navigate through different sections.',
      },
      {
        header: 'Getting Started - Step 3',
        description: 'Excellent! You\'ve learned the basics. Now discover advanced features and customization options.',
      },
      {
        header: 'Getting Started - Step 4',
        description: 'Perfect! You\'re now ready to use all the features. Check out our help center for additional support.',
        learnMoreUrl: 'https://example.com/help-center',
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
      showPagination: true,
    };
    this.showPopover = true;
  }

  showCustomStyledContent() {
    this.popoverData = [
      {
        header: 'Custom Styled Popover',
        description: 'This popover demonstrates custom styling capabilities with CSS custom properties for theming and visual customization.',
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
    };
    this.showPopover = true;
  }
}
