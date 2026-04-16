import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaListComponent,
  ListSelectionEvent,
  AavaListItemsComponent,
  AavaAvatarsComponent,
  AavaIconComponent,
  AavaCheckboxComponent,
  ButtonVariant,
} from '@aava/play-core';

@Component({
  selector: 'ava-list-multi-selection-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaListComponent,
    AavaListItemsComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaCheckboxComponent,
  ],
  template: `
    <div class="demo">
      <aava-list>
        <aava-list-items *ngFor="let profile of documentItems" size="sm">
          <div left>
            <aava-checkbox></aava-checkbox>
          </div>
          <div left>
            <aava-avatars
              size="sm"
              shape="pill"
              [imageUrl]="sampleImageUrl"
            ></aava-avatars>
          </div>
          <div middle>
            <h3>{{ profile.heading }}</h3>
          </div>
          <div right>
            <aava-icon
              [iconName]="'user'"
                 iconColor="var(--color-text-primary)"
              iconSize="24"
            ></aava-icon>
          </div>
        </aava-list-items>
      </aava-list>
    </div>
  `,
  styles: [
    `
      .demo {
        max-width: 500px;
        margin: 2rem auto;
      }
      .status {
        margin-top: 12px;
        font-size: 14px;
      }
    `,
  ],
})
export class MultiSelectionDemoComponent {
  sampleImageUrl = 'assets/1.svg';

  documentItems = [
    {
      id: 1,
      heading: 'Heading come here',
      description: 'Description text goes here',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      iconName: 'chevron-right',
      outline: true,
      button: {
        text: 'label',
        variant: 'primary' as ButtonVariant,
        color: '#1976d2',
        action: 'view_profile',
      },
    },
    {
      id: 2,
      heading: 'Heading come here',
      description: 'Description text goes here',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      iconName: 'chevron-right',
      button: {
        text: 'label',
        variant: 'secondary' as ButtonVariant,
        color: '#388e3c',
        action: 'contact',
      },
    },
    {
      id: 3,
      heading: 'Heading come here',
      description: 'Description text goes here',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      iconName: 'chevron-right',
      button: {
        text: 'label',
        variant: 'primary' as ButtonVariant,
        color: '#f57c00',
        action: 'view_portfolio',
      },
    },
    {
      id: 4,
      heading: 'Heading come here',
      description: 'Description text goes here',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      iconName: 'chevron-right',
      button: {
        text: 'label',
        variant: 'primary' as ButtonVariant,
        color: '#f57c00',
        action: 'view_portfolio',
      },
    },
  ];

  onSelectionChanged(event: ListSelectionEvent): void {
    console.log('Selection changed:', event);
  }
}
