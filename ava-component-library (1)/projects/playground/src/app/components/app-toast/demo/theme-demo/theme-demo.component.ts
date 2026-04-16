import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToastService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-toast-theme-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-description">
        <h3>Theme Options</h3>
        <p>Light and dark theme support for different interface contexts.</p>
      </div>

      <div class="theme-demo">
        <div class="demo-section">
          <h4>Light Theme (Default)</h4>
          <p class="theme-description">
            Default theme with light backgrounds and dark text
          </p>
          <div class="button-group">
            <aava-button
              label="Light Success Toast"
              variant="success"
              (userClick)="showLightSuccess()"
            ></aava-button>
            <aava-button
              label="Light Error Toast"
              variant="danger"
              (userClick)="showLightError()"
            ></aava-button>
            <aava-button
              label="Light Info Toast"
              variant="info"
              (userClick)="showLightInfo()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Dark Theme</h4>
          <p class="theme-description">
            Alternative theme with dark backgrounds and light text
          </p>
          <div class="button-group">
            <aava-button
              label="Dark Success Toast"
              variant="success"
              (userClick)="showDarkSuccess()"
            ></aava-button>
            <aava-button
              label="Dark Warning Toast"
              variant="warning"
              (userClick)="showDarkWarning()"
            ></aava-button>
            <aava-button
              label="Dark Custom Toast"
              variant="primary"
              (userClick)="showDarkCustom()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Theme Comparison</h4>
          <p class="theme-description">
            Compare light and dark themes side by side
          </p>
          <div class="button-group">
            <aava-button
              label="Show Light Theme"
              variant="secondary"
              (userClick)="showLightTheme()"
            ></aava-button>
            <aava-button
              label="Show Dark Theme"
              variant="secondary"
              (userClick)="showDarkTheme()"
            ></aava-button>
            <aava-button
              label="Show Both Themes"
              variant="primary"
              (userClick)="showBothThemes()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Custom Theme Colors</h4>
          <p class="theme-description">
            Fully customizable theme colors for unique branding
          </p>
          <div class="button-group">
            <aava-button
              label="Purple Theme"
              variant="purple"
              (userClick)="showPurpleTheme()"
            ></aava-button>
            <aava-button
              label="Emerald Theme"
              variant="emerald"
              (userClick)="showEmeraldTheme()"
            ></aava-button>
            <aava-button
              label="Custom Colors"
              variant="primary"
              (userClick)="showCustomColors()"
            ></aava-button>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h4>Theme Features</h4>
        <ul class="feature-list">
          <li>
            <strong>Light Theme:</strong> Default theme with light backgrounds
            and dark text
          </li>
          <li>
            <strong>Dark Theme:</strong> Alternative theme with dark backgrounds
            and light text
          </li>
          <li>
            <strong>Automatic Contrast:</strong> Ensures proper readability in
            both themes
          </li>
          <li>
            <strong>Consistent Styling:</strong> Maintains visual hierarchy
            across themes
          </li>
          <li>
            <strong>Custom Colors:</strong> Fully customizable for unique
            branding requirements
          </li>
          <li>
            <strong>Responsive Design:</strong> Adapts to different screen sizes
            and orientations
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 900px;
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

      .theme-demo {
        margin-bottom: 2rem;
      }

      .demo-section {
        padding: 2rem;
        background-color: #f8f9fa;
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

      .theme-description {
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
export class ThemeDemoComponent {
  constructor(private toastService: AavaToastService) { }

  showLightSuccess() {
    this.toastService.success({
      title: 'Light Theme Success',
      message: 'This toast uses the default light theme with green styling.',
      duration: 4000,
    });
  }

  showLightError() {
    this.toastService.error({
      title: 'Light Theme Error',
      message: 'This toast demonstrates the light theme with red styling.',
      duration: 4000,
    });
  }

  showLightInfo() {
    this.toastService.info({
      title: 'Light Theme Info',
      message:
        'Light theme provides excellent readability with dark text on light backgrounds.',
      duration: 4000,
    });
  }

  showDarkSuccess() {
    this.toastService.custom({
      title: 'Dark Theme Success',
      message:
        'This toast uses dark theme styling for better contrast in dark interfaces.',
      customBackground: '#1f2937',
      customTextColor: '#ffffff',
      duration: 4000,
    });
  }

  showDarkWarning() {
    this.toastService.custom({
      title: 'Dark Theme Warning',
      message:
        'Dark theme maintains visual hierarchy while providing excellent contrast.',
      customBackground: '#374151',
      customTextColor: '#ffffff',
      duration: 4000,
    });
  }

  showDarkCustom() {
    this.toastService.custom({
      title: 'Dark Theme Custom',
      message: 'Fully customizable dark theme with unique styling options.',
      customBackground: '#111827',
      customTextColor: '#f9fafb',
      customWidth: '500px',
      duration: 4000,
    });
  }

  showLightTheme() {
    this.toastService.success({
      title: 'Light Theme',
      message: 'Default light theme with excellent readability and contrast.',
      duration: 3000,
    });
  }

  showDarkTheme() {
    this.toastService.custom({
      title: 'Dark Theme',
      message: 'Dark theme alternative for modern interface designs.',
      customBackground: '#1f2937',
      customTextColor: '#ffffff',
      duration: 3000,
    });
  }

  showBothThemes() {
    // Show light theme toast
    this.toastService.success({
      title: 'Light Theme',
      message: 'This is the default light theme.',
      duration: 3000,
    });

    // Show dark theme toast after a delay
    setTimeout(() => {
      this.toastService.custom({
        title: 'Dark Theme',
        message: 'This is the dark theme alternative.',
        customBackground: '#1f2937',
        customTextColor: '#ffffff',
        duration: 3000,
      });
    }, 500);
  }

  showPurpleTheme() {
    this.toastService.custom({
      title: 'Purple Theme',
      message: 'Custom purple theme for unique branding requirements.',
      customBackground: '#7c3aed',
      customTextColor: '#ffffff',
      duration: 4000,
    });
  }

  showEmeraldTheme() {
    this.toastService.custom({
      title: 'Emerald Theme',
      message: 'Emerald theme with natural, calming color palette.',
      customBackground: '#059669',
      customTextColor: '#ffffff',
      duration: 4000,
    });
  }

  showCustomColors() {
    this.toastService.custom({
      title: 'Custom Colors',
      message: 'Fully customizable colors for any design requirement.',
      customBackground: '#dc2626',
      customTextColor: '#ffffff',
      customWidth: '450px',
      duration: 4000,
    });
  }
}
