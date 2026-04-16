import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToastService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-toast-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="variants-demo">
        <div class="demo-section">
          <div class="button-group">
            <aava-button
              label="Show Success Toast"
              variant="success"
              (userClick)="showSuccessToast()"
            ></aava-button>
            <aava-button
              label="Show Error Toast"
              variant="danger"
              (userClick)="showErrorToast()"
            ></aava-button>
            <aava-button
              label="Show Warning Toast"
              variant="warning"
              (userClick)="showWarningToast()"
            ></aava-button>
            <aava-button
              label="Show Info Toast"
              variant="info"
              (userClick)="showInfoToast()"
            ></aava-button>
            <aava-button
              label="Show Default Toast"
              variant="secondary"
              (userClick)="showDefaultToast()"
            ></aava-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        margin-top: 4rem;
      }

      .demo-description {
        margin-bottom: 2rem;
      }

      .demo-description h3 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 24px;
      }

      .demo-description p {
        color: #666;
        font-size: 16px;
        line-height: 1.5;
      }

      .variants-demo {
        margin-bottom: 2rem;
      }

      .demo-section {
        padding: 2rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        text-align: center;
      }

      .demo-section h4 {
        color: #333;
        margin-bottom: 0.5rem;
        font-size: 20px;
        font-weight: 500;
      }

      .variant-description {
        color: #666;
        font-size: 14px;
        margin-bottom: 1.5rem;
        font-style: italic;
      }

      .button-group {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .info-section {
        padding: 1.5rem;
        background-color: #e3f2fd;
        border-radius: 8px;
        border-left: 4px solid #2196f3;
        text-align: left;
      }

      .info-section h4 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 18px;
        font-weight: 500;
      }

      .feature-list {
        margin: 0;
        padding-left: 1.5rem;
        color: #666;
        line-height: 1.6;
      }

      .feature-list li {
        margin-bottom: 0.5rem;
      }

      .feature-list strong {
        color: #333;
      }
    `,
  ],
})
export class VariantsDemoComponent {
  constructor(private toastService: AavaToastService) { }

  showSuccessToast() {
    this.toastService.success({
      title: 'Successfully created!',
      message: 'Your changes have been saved successfully',
      duration: 2000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }

  showErrorToast() {
    this.toastService.error({
      title: 'Error Occurred',
      message: 'Connection error. Unable to connect to the server at present',
      duration: 2000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }

  showWarningToast() {
    this.toastService.warning({
      title: 'Warning Occurred',
      message: 'Please review your input carefully before proceeding.',
      duration: 2000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }

  showInfoToast() {
    this.toastService.info({
      title: 'Action Required',
      message: 'Please review your input carefully before proceeding.',
      duration: 2000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }

  showDefaultToast() {
    this.toastService.default({
      title: 'Default Toast Occurred',
      message: 'This is a default toast with neutral styling.',
      duration: 2000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }

  showCustomToast() {
    this.toastService.custom({
      title: 'Custom Toast',
      message: 'This is a fully customizable toast with unique styling.',
      customBackground: 'var(--color-primary)',
      customTextColor: 'var(--color-text-primary)',
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }
}
