import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '@aava/play-core';

@Component({
  selector: 'app-app-snackbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-snackbar.component.html',
  styleUrls: ['./app-snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppSnackbarComponent {
  quickStartCode = `<ava-button
  label="Show Snackbar"
  variant="primary"
  size="md"
  state="default"
  (click)="showSnackbar()">
</ava-button>

// In component:
constructor(private snackbarService: SnackbarService) {}

showSnackbar() {
  this.snackbarService.show('This is a snackbar message', 'top-center');
}`;

  constructor(private snackbarService: SnackbarService) { }

  // Basic snackbar (your existing code still works)
  triggerSnackBar() {
    this.snackbarService.show(
      'Your order is being prepared, please hold on a moment...',
      'bottom-center',
      5000
    );
  }

  // Snackbar with action link
  triggerSnackBarWithAction() {
    this.snackbarService.show(
      'Single-line snackbar with action',
      'bottom-center',
      5000,
      '#fff',
      '#333',
      {
        action: {
          text: 'Action',
          color: 'primary',
          href: 'https://example.com',
        },
      }
    );
  }

  // Snackbar with icon
  triggerSnackBarWithIcon() {
    this.snackbarService.show(
      'Success! Your order has been placed.',
      'top-center',
      5000,
      '#fff',
      '#10B981',
      {
        icon: {
          name: 'circle-check',
          color: '#fff',
          size: 18,
        },
      }
    );
  }

  // Snackbar with icon and action
  triggerSnackBarWithIconAndAction() {
    this.snackbarService.show(
      'File uploaded successfully!',
      'bottom-right',
      5000,
      '#fff',
      '#255a49ff',
      {
        icon: {
          name: 'square-pen',
          color: '#fff',
          size: 16,
        },
        action: {
          text: 'View',
          color: 'info',
          callback: () => {
            console.log('View file clicked!');
          },
        },
      }
    );
  }

  // Dismissible snackbar
  triggerDismissibleSnackbar() {
    this.snackbarService.show(
      'This message can be dismissed manually',
      'top-right',
      5000,
      '#fff',
      '#EF4444',
      {
        dismissible: true,
        icon: {
          name: 'wifi',
          color: '#fff',
          size: 16,
        },
      }
    );
  }

  // Error snackbar with action
  triggerErrorSnackbar() {
    this.snackbarService.show(
      'Connection failed. Please try again.',
      'top-center',
      5000, // 0 means it won't auto-dismiss
      '#fff',
      '#461b1bff',
      {
        dismissible: true,
        icon: {
          name: 'wifi',
          color: '#fff',
          size: 16,
        },
        action: {
          text: 'Retry',
          color: 'danger',
          callback: () => {
            console.log('Retry connection...');
          },
        },
      }
    );
  }

  // Info snackbar
  triggerInfoSnackbar() {
    this.snackbarService.show(
      'New update available!',
      'bottom-left',
      5000,
      '#000',
      '#9ce0e0ff',
      {
        icon: {
          name: 'circle-check',
          color: '#000',
          size: 16,
        },
        action: {
          text: 'Update',
          color: 'info',
          href: '/update',
        },
      }
    );
  }

  // Surface-bold: medium
  triggerSurfaceBoldMedium() {
    this.snackbarService.show(
      'Surface Bold - Medium (Glass 50)',
      'bottom-center',
      4000,
      '#222',
      '',
      {
        variant: 'surface-bold',
        type: 'medium',
        dismissible: true,
      }
    );
  }

  // Surface-bold: strong
  triggerSurfaceBoldStrong() {
    this.snackbarService.show(
      'Surface Bold - Strong (Glass 75)',
      'bottom-center',
      4000,
      '#222',
      '',
      {
        variant: 'surface-bold',
        type: 'strong',
        dismissible: true,
      }
    );
  }

  // Surface-bold: max
  triggerSurfaceBoldMax() {
    this.snackbarService.show(
      'Surface Bold - Max (Glass 100)',
      'bottom-center',
      4000,
      '#222',
      '',
      {
        variant: 'surface-bold',
        type: 'max',
        dismissible: true,
      }
    );
  }

  // Snackbar: Message + Small Action Link + Icon + Persistent X
  triggerMessageActionIconSnackbar() {
    this.snackbarService.show(
      'Profile updated successfully!',
      'bottom-center',
      70000, // 0 for persistent, only closes on X
      '#fff',
      '#059669',
      {
        dismissible: true,
        icon: {
          name: 'check',
          color: '#fff',
          size: 20,
        },
        action: {
          text: 'Undo',
          color: 'primary',
          href: '#',
        },
      }
    );
  }

  // Persistent snackbar with icon on right, only closes on action or X
  triggerPersistentRightIconSnackbar() {
    this.snackbarService.show(
      'Session expired. Please login again.',
      'bottom-center',
      0, // duration is ignored if persistent is true
      '#fff',
      '#F59E42',
      {
        dismissible: true,
        persistent: true,
        action: {
          text: 'Login',
          color: 'primary',
          href: '#',
          callback: () => {
            this.snackbarService.dismiss(); // Manually close on action
          },
        },
      }
    );
  }

  // Snackbar with action link containing X icon inside
  triggerActionLinkWithXIcon() {
    this.snackbarService.show(
      'You have unsaved changes.',
      'bottom-center',
      0,
      '#fff',
      '#759b91ff',
      {
        dismissible: false,
        persistent: true,
        action: {
          text: 'Discard',
          color: 'primary',
          href: '#',
          showXInside: true,
        },
      }
    );
  }

  // Snackbar: text then icon at end, icon click closes snackbar
  triggerTextWithEndIconClose() {
    this.snackbarService.show(
      'Download complete.',
      'bottom-center',
      0,
      '#fff',
      '#059669',
      {
        dismissible: false,
        persistent: true,
        icon: {
          name: 'x',
          color: '#fff',
          size: 20,
          position: 'right',
          iconClose: true,
        },
      }
    );
  }

  sections = [
    {
      title: 'Basic Snackbar',
      description: 'A standard snackbar with message, action, and duration.',
      showCode: false,
    },
    {
      title: 'Animated Snackbar',
      description: 'Snackbar with optional animation control.',
      showCode: false,
    },
    {
      title: 'Snackbar Sizes',
      description:
        'Demonstrates various snackbar sizes (small, medium, large, extra-large).',
      showCode: false,
    },
    {
      title: 'Extended Sizes',
      description:
        'Real-world snackbar examples with longer messages and different sizes.',
      showCode: false,
    },
  ];

  snackbarMessage = '';
  snackbarActionLabel = '';
  snackbarDuration = 3000;
  snackbarSize: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  snackbarAnimate = true;

  showSnackbar(
    message: string,
    actionLabel: string,
    duration: number,
    size: 'sm' | 'md' | 'lg' | 'xl',
    animate = true
  ) {
    this.snackbarMessage = message;
    this.snackbarActionLabel = actionLabel;
    this.snackbarDuration = duration;
    this.snackbarSize = size;
    this.snackbarAnimate = animate;

    // this.snackbar.message = message;
    // this.snackbar.actionLabel = actionLabel;
    // this.snackbar.duration = duration;
    // this.snackbar.size = size;
    // this.snackbar.animate = animate;

    // this.snackbar.show();
  }

  onSnackbarAction() {
    // console.log('Snackbar action clicked!');
  }

  onSnackbarDismiss() {
    // console.log('Snackbar dismissed');
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getSnackbarCode(sectionTitle: string): string {
    const codeMap: Record<string, string> = {
      'basic snackbar': `
<awe-snackbar
  #snackbar
  [message]="snackbarMessage"
  [actionLabel]="snackbarActionLabel"
  [duration]="snackbarDuration"
  [size]="snackbarSize"
  [animate]="snackbarAnimate"
  (action)="onSnackbarAction()"
  (dismiss)="onSnackbarDismiss()">
</awe-snackbar>

<section class="bottom-panel">
  <awe-button variant="primary" (click)="showSnackbar('Save your progress?', 'Yes', 10000, 'medium')">Normal Snackbar</awe-button>
</section>`,

      'animated snackbar': `
<section class="bottom-panel">
  <awe-button variant="secondary" (click)="showSnackbar('Your order is being prepared, please hold on a moment...', 'Cancel', 5000, 'medium', true)">Animated Snackbar</awe-button>
  <awe-button variant="primary" (click)="showSnackbar('Your order has been successfully placed! Do you want to track it?', 'Track Order', 5000, 'medium', false)">Non-Animated Snackbar</awe-button>
</section>`,
      'snackbar sizes': `
<section class="bottom-panel">
  <awe-button variant="primary" (click)="showSnackbar('Error: Payment failed due to insufficient balance. Try another method?', 'Undo', 5000, 'extra-large')">Extra Large</awe-button>
  <awe-button variant="secondary" (click)="showSnackbar('Your session will expire soon. Save your progress?', 'View', 5000, 'large')">Large</awe-button>
  <awe-button variant="primary" (click)="showSnackbar('Your file has been uploaded.', 'Extend', 5000, 'medium')">Medium</awe-button>
  <awe-button variant="secondary" (click)="showSnackbar('Saved', 'Retry', 5000, 'small')">Small</awe-button>
</section>`,

      'extended sizes': `
<section class="bottom-panel">
  <awe-button variant="primary" (click)="showSnackbar('Your payment failed due to insufficient balance. Would you like to try another method?', 'Try Again', 5000, 'extra-large')">Extra Large snackbar</awe-button>
  <awe-button variant="secondary" (click)="showSnackbar('Oops! We couldn’t complete the payment. Do you want to choose a different payment option?', 'Choose Option', 5000, 'large')">Large snackbar</awe-button>
  <awe-button variant="primary" (click)="showSnackbar('Payment unsuccessful. Please try a different method.', 'Retry', 5000, 'medium')">Medium snackbar</awe-button>
  <awe-button variant="secondary" (click)="showSnackbar('Payment failed. Try again.', 'Retry', 5000, 'small')">Small snackbar</awe-button>
</section>`,
    };

    return codeMap[sectionTitle.toLowerCase()] || '';
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickInside = clickedElement.closest('.section-header');
    if (!isClickInside) {
      this.sections.forEach((section) => (section.showCode = false));
    }
  }

  apiProps = [
    {
      name: 'message',
      type: 'string',
      default: '""',
      description: 'The message to be displayed in the snackbar.',
    },
    {
      name: 'actionLabel',
      type: 'string',
      default: '""',
      description: 'Label for the action button.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '3000',
      description: 'Time in milliseconds for which the snackbar is displayed.',
    },
    {
      name: 'size',
      type: '"small" | "medium" | "large" | "extra-large"',
      default: '"medium"',
      description: 'Size of the snackbar.',
    },
    {
      name: 'animate',
      type: 'boolean',
      default: 'true',
      description: 'Whether to animate the appearance of the snackbar.',
    },
  ];

  events = [
    {
      name: 'action',
      type: 'EventEmitter<void>',
      description: 'Emitted when the action button is clicked.',
    },
    {
      name: 'dismiss',
      type: 'EventEmitter<void>',
      description:
        'Emitted when the snackbar is dismissed automatically or manually.',
    },
  ];

  // Copy Code to Clipboard (for the code example)
  copyCode(section: string): void {
    const code = this.getSnackbarCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }
}
