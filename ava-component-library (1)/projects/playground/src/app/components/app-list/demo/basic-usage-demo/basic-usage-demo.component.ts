import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaListComponent,
  AavaListItemsComponent,
  AavaAvatarsComponent,
  AavaIconComponent,
  ButtonVariant,
} from '@aava/play-core';

@Component({
  selector: 'app-basic-usage-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaListComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaListItemsComponent,
  ],
  template: `
    <div class="demo">
      <aava-list>
        <aava-list-items *ngFor="let profile of userProfiles">
          <div left>
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
            ></aava-avatars>
          </div>
          <div middle>
            <h4>{{ profile.heading }}</h4>
            <p>{{ profile.description }}</p>
          </div>
          <div right>
            <aava-icon
              [iconName]="'arrow-right'"
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
        max-width: 440px;
        margin: 2rem auto;
      }
      .status {
        margin-top: 12px;
        font-size: 14px;
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  sampleImageUrl = 'assets/1.svg';

  userProfiles = [
    {
      id: 1,
      heading: 'Heading comes here',
      description: 'Description text goes here',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      iconName: 'chevron-right',

      button: {
        text: 'label',
        variant: 'primary' as ButtonVariant,
        color: '#1976d2',
        action: 'view_profile',
      },
    },
    {
      id: 2,
      heading: 'Heading comes here',
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
      heading: 'Heading comes here',
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
}
