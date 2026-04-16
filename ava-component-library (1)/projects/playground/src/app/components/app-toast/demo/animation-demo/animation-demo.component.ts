import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToastService } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-toast-animation-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-description">
        <h3>Toast Animations</h3>
        <p>Smooth entrance and exit animations with configurable timing.</p>
      </div>

      <div class="animation-demo">
        <div class="demo-section">
          <h4>Entrance Animations</h4>
          <p class="animation-description">
            Different ways toasts can appear on screen
          </p>
          <div class="button-group">
            <aava-button
              label="Slide In from Top"
              variant="primary"
              (userClick)="showSlideInTop()"
            ></aava-button>
            <aava-button
              label="Slide In from Right"
              variant="primary"
              (userClick)="showSlideInRight()"
            ></aava-button>
            <aava-button
              label="Fade In"
              variant="primary"
              (userClick)="showFadeIn()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Exit Animations</h4>
          <p class="animation-description">
            Smooth exit animations when toasts are dismissed
          </p>
          <div class="button-group">
            <aava-button
              label="Quick Exit (1s)"
              variant="secondary"
              (userClick)="showQuickExit()"
            ></aava-button>
            <aava-button
              label="Slow Exit (8s)"
              variant="secondary"
              (userClick)="showSlowExit()"
            ></aava-button>
            <aava-button
              label="No Auto-Exit"
              variant="secondary"
              (userClick)="showNoAutoExit()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Progress Bar Animations</h4>
          <p class="animation-description">
            Visual countdown for auto-dismiss toasts
          </p>
          <div class="button-group">
            <aava-button
              label="Show Progress Bar"
              variant="success"
              (userClick)="showWithProgress()"
            ></aava-button>
            <aava-button
              label="Hide Progress Bar"
              variant="success"
              (userClick)="showWithoutProgress()"
            ></aava-button>
            <aava-button
              label="Custom Progress Color"
              variant="success"
              (userClick)="showCustomProgress()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Animation Sequences</h4>
          <p class="animation-description">
            Multiple toasts with staggered animations
          </p>
          <div class="button-group">
            <aava-button
              label="Staggered Entrance"
              variant="warning"
              (userClick)="showStaggeredEntrance()"
            ></aava-button>
            <aava-button
              label="Cascade Effect"
              variant="warning"
              (userClick)="showCascadeEffect()"
            ></aava-button>
            <aava-button
              label="Wave Animation"
              variant="warning"
              (userClick)="showWaveAnimation()"
            ></aava-button>
          </div>
        </div>

        <div class="demo-section">
          <h4>Hover Interactions</h4>
          <p class="animation-description">
            Timer pauses when user hovers over toast
          </p>
          <div class="button-group">
            <aava-button
              label="Hover to Pause"
              variant="info"
              (userClick)="showHoverPause()"
            ></aava-button>
            <aava-button
              label="Hover to Resume"
              variant="info"
              (userClick)="showHoverResume()"
            ></aava-button>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h4>Animation Features</h4>
        <ul class="feature-list">
          <li>
            <strong>Slide In/Out:</strong> Smooth sliding animations from/to
            screen edges
          </li>
          <li>
            <strong>Fade Effects:</strong> Subtle opacity transitions for
            enhanced UX
          </li>
          <li>
            <strong>Progress Bar:</strong> Visual countdown for auto-dismiss
            toasts
          </li>
          <li>
            <strong>Hover Pause:</strong> Timer pauses when user hovers over
            toast
          </li>
          <li>
            <strong>Staggered Animations:</strong> Multiple toasts with
            coordinated timing
          </li>
          <li>
            <strong>Custom Timing:</strong> Configurable animation durations and
            delays
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 1000px;
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

      .animation-demo {
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

      .animation-description {
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
export class AnimationDemoComponent {
  constructor(private toastService: AavaToastService) { }

  showSlideInTop() {
    this.toastService.success({
      title: 'Slide In from Top',
      message: 'This toast slides in smoothly from the top of the screen.',
      duration: 4000,
    });
  }

  showSlideInRight() {
    this.toastService.info({
      title: 'Slide In from Right',
      message:
        'This toast slides in from the right side with smooth animation.',
      duration: 4000,
    });
  }

  showFadeIn() {
    this.toastService.warning({
      title: 'Fade In Effect',
      message: 'This toast fades in with a subtle opacity transition.',
      duration: 4000,
    });
  }

  showQuickExit() {
    this.toastService.success({
      title: 'Quick Exit',
      message: 'This toast will disappear quickly in 1 second.',
      duration: 1000,
    });
  }

  showSlowExit() {
    this.toastService.info({
      title: 'Slow Exit',
      message:
        'This toast will stay visible for 8 seconds with slow animation.',
      duration: 8000,
    });
  }

  showNoAutoExit() {
    this.toastService.warning({
      title: 'No Auto-Exit',
      message: 'This toast will not auto-dismiss. You must close it manually.',
      duration: 0,
    });
  }

  showWithProgress() {
    this.toastService.success({
      title: 'Progress Bar',
      message:
        'This toast shows a progress bar indicating when it will auto-dismiss.',
      showProgress: true,
      duration: 5000,
    });
  }

  showWithoutProgress() {
    this.toastService.info({
      title: 'No Progress Bar',
      message: 'This toast hides the progress bar for a cleaner look.',
      showProgress: false,
      duration: 5000,
    });
  }

  showCustomProgress() {
    this.toastService.custom({
      title: 'Custom Progress',
      message: 'This toast has a custom progress bar color.',
      showProgress: true,
      progressColor: '#8b5cf6',
      duration: 5000,
    });
  }

  showStaggeredEntrance() {
    // Show first toast
    this.toastService.success({
      title: 'First Toast',
      message: 'This is the first toast in the sequence.',
      duration: 3000,
    });

    // Show second toast after 300ms
    setTimeout(() => {
      this.toastService.warning({
        title: 'Second Toast',
        message: 'This toast appears with a staggered delay.',
        duration: 3000,
      });
    }, 300);

    // Show third toast after 600ms
    setTimeout(() => {
      this.toastService.info({
        title: 'Third Toast',
        message: 'This toast completes the staggered sequence.',
        duration: 3000,
      });
    }, 600);
  }

  showCascadeEffect() {
    // Show toasts in a cascade pattern
    for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        this.toastService.success({
          title: `Toast ${i}`,
          message: `Cascade effect toast number ${i}`,
          duration: 3000,
        });
      }, i * 200);
    }
  }

  showWaveAnimation() {
    // Create a wave effect with different toast types
    const types = ['success', 'warning', 'info', 'error'];
    types.forEach((type, index) => {
      setTimeout(() => {
        switch (type) {
          case 'success':
            this.toastService.success({
              title: 'Wave Success',
              message: `Wave animation toast ${index + 1}`,
              duration: 3000,
            });
            break;
          case 'warning':
            this.toastService.warning({
              title: 'Wave Warning',
              message: `Wave animation toast ${index + 1}`,
              duration: 3000,
            });
            break;
          case 'info':
            this.toastService.info({
              title: 'Wave Info',
              message: `Wave animation toast ${index + 1}`,
              duration: 3000,
            });
            break;
          case 'error':
            this.toastService.error({
              title: 'Wave Error',
              message: `Wave animation toast ${index + 1}`,
              duration: 3000,
            });
            break;
        }
      }, index * 150);
    });
  }

  showHoverPause() {
    this.toastService.success({
      title: 'Hover to Pause',
      message: 'Hover over this toast to pause the timer. Move away to resume.',
      duration: 6000,
    });
  }

  showHoverResume() {
    this.toastService.info({
      title: 'Hover to Resume',
      message:
        'This toast demonstrates the hover pause and resume functionality.',
      duration: 6000,
    });
  }
}
