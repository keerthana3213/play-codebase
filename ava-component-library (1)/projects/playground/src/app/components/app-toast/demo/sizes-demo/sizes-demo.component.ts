import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToastService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-toast-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="sizes-demo">
        <div class="demo-section">
          <div class="button-group">
            <aava-button
              label="Show Small Success"
              variant="success"
              size="sm"
              (userClick)="showSmallSuccess()"
            ></aava-button>
            <aava-button
              label="Show Medium Warning"
              variant="warning"
              size="sm"
              (userClick)="showMediumWarning()"
            ></aava-button>
            <aava-button
              label="Show Large Success"
              variant="danger"
              size="sm"
              (userClick)="showLargeError()"
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
        margin-top: 3rem;
        text-align: center;
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

      .sizes-demo {
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

      .size-description {
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
export class SizesDemoComponent {
  constructor(private toastService: AavaToastService) { }

  showSmallSuccess() {
    this.toastService.success({
      title: 'Successfully created!',
      message: 'Your changes have been saved successfully',
      duration: 1000,
      customWidth: '300px',
      design: 'modern',
      size: 'small',
    });
  }

  showMediumWarning() {
    this.toastService.warning({
      title: 'Action Required',
      message: 'Incomplete fields.Please fill in all required information.',
      duration: 1000,
      customWidth: '350px',
      design: 'modern',
      size: 'medium',
    });
  }

  showLargeError() {
    this.toastService.error({
      title: 'Error Occurred',
      message: 'Connection error. Unable to connect to the server at present',
      duration: 1000,
      customWidth: '400px',
      design: 'modern',
      size: 'large',
    });
  }
}
