import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaTextCardComponent,
  AavaButtonComponent,
  AavaIconComponent
} from '@aava/play-core'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-cards',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaTextCardComponent,
    AavaIconComponent,
  ],
  templateUrl: './app-cards.component.html',
  styleUrl: './app-cards.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppCardsComponent {
  consoleApproval = {
    header: {
      iconName: 'home',
      title: 'High Priority Approval',
      viewAll: true,
    },
    contents: [
      {
        session1: {
          title: 'Autonomous Systems.... Agent1',
          labels: [
            {
              name: 'Agent',
              color: 'success',
              background: 'red',
              type: 'normal',
            },
            {
              name: 'High',
              color: 'error',
              background: 'red',
              type: 'pill',
            },
          ],
        },
        session2: [
          {
            name: 'Agent',
            color: 'default',
            background: 'red',
            type: 'normal',
          },
          {
            name: 'High',
            color: 'default',
            background: 'red',
            type: 'normal',
          },
        ],
        session3: [
          {
            iconName: 'user',
            label: 'example@ascendion.com',
          },
          {
            iconName: 'calendar-days',
            label: '12 May 2025',
          },
        ],
        session4: {
          status: 'Execution was successful',
          iconName: 'circle-check-big',
        },
      },
      {
        session1: {
          title: 'Autonomous Systems.... Agent1',
          labels: [
            {
              name: 'Agent',
              color: 'success',
              background: 'red',
              type: 'normal',
            },
            {
              name: 'High',
              color: 'error',
              background: 'red',
              type: 'pill',
            },
          ],
        },
        session2: [
          {
            name: 'Agent',
            color: 'default',
            background: 'red',
            type: 'normal',
          },
          {
            name: 'High',
            color: 'default',
            background: 'red',
            type: 'normal',
          },
        ],
        session3: [
          {
            iconName: 'user',
            label: 'example@ascendion.com',
          },
          {
            iconName: 'calendar-days',
            label: '12 May 2025',
          },
        ],
        session4: {
          status: 'Execution was successful',
          iconName: 'circle-check-big',
        },
      },
      {
        session1: {
          title: 'Autonomous Systems.... Agent1',
          labels: [
            {
              name: 'Agent',
              color: 'success',
              background: 'red',
              type: 'normal',
            },
            {
              name: 'High',
              color: 'error',
              background: 'red',
              type: 'pill',
            },
          ],
        },
        session2: [
          {
            name: 'Agent',
            color: 'default',
            background: 'red',
            type: 'normal',
          },
          {
            name: 'High',
            color: 'default',
            background: 'red',
            type: 'normal',
          },
        ],
        session3: [
          {
            iconName: 'user',
            label: 'example@ascendion.com',
          },
          {
            iconName: 'calendar-days',
            label: '12 May 2025',
          },
        ],
        session4: {
          status: 'Execution was successful',
          iconName: 'circle-check-big',
        },
      },
    ],
    footer: {},
  };
  iconList = [
    { name: 'archive', iconName: 'archive', cursor: true },
    { name: 'trash', iconName: 'trash-2', cursor: true },
    { name: 'copy', iconName: 'copy', cursor: true },
    { name: 'play', iconName: 'play', cursor: true },
  ];
  uClick(i: any) {
    console.log('log' + i);
  }
  iconClick(event: any) {
    console.log(event);
  }

  headerIcons = [
    { iconName: 'wrench', title: 'Tool' },
    { iconName: 'users', title: '123' },
  ];

  footerIcons = [
    { iconName: 'user', title: 'Michael Scott' },
    { iconName: 'calendar-days', title: '1/2/2025' },
  ];
}
