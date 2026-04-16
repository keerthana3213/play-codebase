import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaListComponent,
  ListItem,
  ListSelectionEvent,
  ListButtonClickEvent,
} from '@aava/play-core';

@Component({
  selector: 'ava-list-action-buttons-demo',
  standalone: true,
  imports: [CommonModule, AavaListComponent],
  template: `
    <div class="demo">
      <aava-list
        [items]="items"
        [title]="'Team Members with Actions'"
        [height]="'320px'"
        [width]="'500px'"
        (onButtonClick)="onButtonClick($event)"
      ></aava-list>

      <div class="status">
        Last Button Click: {{ lastButtonClick || 'None' }}
      </div>
    </div>
  `,
  styles: [
    `
      .demo {
        max-width: 540px;
        margin: 2rem auto;
      }
      .status {
        margin-top: 12px;
        font-size: 14px;
      }
    `,
  ],
})
export class ActionButtonsDemoComponent {
  lastButtonClick: string | null = null;

  items: ListItem[] = [
    {
      id: '1',
      title: 'John Doe',
      subtitle: 'Software Engineer',
      buttons: [
        {
          id: 'view',
          label: 'View',
          variant: 'primary',
          size: 'xs',
          pill: true,
        },
        {
          id: 'edit',
          label: 'Edit',
          variant: 'secondary',
          size: 'xs',
          pill: true,
        },
        {
          id: 'delete',
          label: 'Delete',
          variant: 'danger',
          size: 'xs',
          pill: true,
        },
      ],
    },
    {
      id: '2',
      title: 'Jane Smith',
      subtitle: 'Product Manager',
      buttons: [
        {
          id: 'contact',
          label: 'Contact',
          variant: 'success',
          size: 'xs',
          pill: true,
        },
        {
          id: 'schedule',
          label: 'Schedule',
          variant: 'info',
          size: 'xs',
          pill: true,
        },
      ],
    },
    {
      id: '3',
      title: 'Bob Johnson',
      subtitle: 'UX Designer',
      buttons: [
        {
          id: 'portfolio',
          label: 'Portfolio',
          variant: 'warning',
          size: 'xs',
          pill: true,
        },
        {
          id: 'hire',
          label: 'Hire',
          variant: 'primary',
          size: 'xs',
          pill: true,
        },
      ],
    },
  ];

  // Button variants showcase
  buttonVariantsItems: ListItem[] = [
    {
      id: '1',
      title: 'Primary Button',
      subtitle: 'Default primary variant',
      avatar: {
        profileText: 'PB',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'primary',
          label: 'Primary',
          variant: 'primary',
          size: 'sm',
        },
      ],
    },
    {
      id: '2',
      title: 'Secondary Button',
      subtitle: 'Secondary variant',
      avatar: {
        profileText: 'SB',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'secondary',
          label: 'Secondary',
          variant: 'secondary',
          size: 'sm',
        },
      ],
    },
    {
      id: '3',
      title: 'Success Button',
      subtitle: 'Success variant',
      avatar: {
        profileText: 'SU',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'success',
          label: 'Success',
          variant: 'success',
          size: 'sm',
        },
      ],
    },
    {
      id: '4',
      title: 'Danger Button',
      subtitle: 'Danger variant',
      avatar: {
        profileText: 'DB',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'danger',
          label: 'Danger',
          variant: 'danger',
          size: 'sm',
        },
      ],
    },
  ];

  // Icon integration examples
  iconIntegrationItems: ListItem[] = [
    {
      id: '1',
      title: 'Icon Left',
      subtitle: 'Icon positioned on the left',
      avatar: {
        profileText: 'IL',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'icon-left',
          label: 'Download',
          variant: 'primary',
          size: 'sm',
          iconName: 'download',
          iconPosition: 'left',
        },
      ],
    },
    {
      id: '2',
      title: 'Icon Right',
      subtitle: 'Icon positioned on the right',
      avatar: {
        profileText: 'IR',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'icon-right',
          label: 'Next',
          variant: 'secondary',
          size: 'sm',
          iconName: 'arrow-right',
          iconPosition: 'right',
        },
      ],
    },
    {
      id: '3',
      title: 'Icon Only',
      subtitle: 'Button with icon only',
      avatar: {
        profileText: 'IO',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'icon-only',
          variant: 'info',
          size: 'sm',
          iconName: 'settings',
          iconPosition: 'only',
        },
      ],
    },
    {
      id: '4',
      title: 'Clickable Icon',
      subtitle: 'Standalone clickable icon',
      avatar: {
        profileText: 'CI',
        size: 'md',
        shape: 'pill',
      },
      icon: {
        iconName: 'heart',
        iconColor: '#e74c3c',
        iconSize: 20,
      },
    },
  ];

  // Interactive states
  interactiveStatesItems: ListItem[] = [
    {
      id: '1',
      title: 'Normal Button',
      subtitle: 'Standard interactive button',
      avatar: {
        profileText: 'NB',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'normal',
          label: 'Click Me',
          variant: 'primary',
          size: 'sm',
        },
      ],
    },
    {
      id: '2',
      title: 'Disabled Button',
      subtitle: 'Button in disabled state',
      avatar: {
        profileText: 'DB',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'disabled',
          label: 'Disabled',
          variant: 'secondary',
          size: 'sm',
          disabled: true,
        },
      ],
    },
    {
      id: '3',
      title: 'Processing Button',
      subtitle: 'Button in processing state',
      avatar: {
        profileText: 'PB',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'processing',
          label: 'Processing...',
          variant: 'success',
          size: 'sm',
          processing: true,
        },
      ],
    },
    {
      id: '4',
      title: 'Pill Button',
      subtitle: 'Rounded pill variant',
      avatar: {
        profileText: 'PL',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'pill',
          label: 'Pill Style',
          variant: 'warning',
          size: 'sm',
          pill: true,
        },
      ],
    },
  ];

  // Custom layouts
  customLayoutItems: ListItem[] = [
    {
      id: '1',
      title: 'Compact Layout',
      subtitle: 'Multiple small buttons',
      avatar: {
        profileText: 'CL',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'view',
          label: 'View',
          variant: 'primary',
          size: 'xs',
          pill: true,
        },
        {
          id: 'edit',
          label: 'Edit',
          variant: 'secondary',
          size: 'xs',
          pill: true,
        },
        {
          id: 'share',
          label: 'Share',
          variant: 'info',
          size: 'xs',
          pill: true,
        },
      ],
    },
    {
      id: '2',
      title: 'Mixed Sizes',
      subtitle: 'Buttons of different sizes',
      avatar: {
        profileText: 'MS',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'large',
          label: 'Large',
          variant: 'primary',
          size: 'lg',
        },
        {
          id: 'small',
          label: 'Small',
          variant: 'secondary',
          size: 'xs',
          pill: true,
        },
      ],
    },
    {
      id: '3',
      title: 'Color Variants',
      subtitle: 'Different color schemes',
      avatar: {
        profileText: 'CV',
        size: 'md',
        shape: 'pill',
      },
      buttons: [
        {
          id: 'success',
          label: 'Approve',
          variant: 'success',
          size: 'sm',
        },
        {
          id: 'warning',
          label: 'Review',
          variant: 'warning',
          size: 'sm',
        },
        {
          id: 'danger',
          label: 'Reject',
          variant: 'danger',
          size: 'sm',
        },
      ],
    },
  ];

  // Event handlers
  onButtonClick(event: ListButtonClickEvent): void {
    this.lastButtonClick = `${event.button.label || event.button.id
      } clicked for ${event.item.title}`;
    console.log('Button clicked:', event);
  }
}
