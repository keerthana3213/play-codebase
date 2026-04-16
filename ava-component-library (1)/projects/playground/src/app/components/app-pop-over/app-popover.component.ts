import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AavaPopoverDirective, PopOverData, AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaPopoverDirective, AavaButtonComponent],
  templateUrl: './app-popover.component.html',
  styleUrl: './app-popover.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppPopoverComponent {
  // Sample data for popover
  samplePopoverData: PopOverData[] = [
    {
      header: 'Heading 1',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 2',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 3',
      description: 'This is body text of this tool tip',
    },
  ];

  multiStepData: PopOverData[] = [
    {
      header: 'Heading 1',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 2',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 3',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 4',
      description: 'This is body text of this tool tip',
    },
  ];

  singleStepData: PopOverData[] = [
    {
      header: 'Heading',
      description: 'This is body text of this tool tip',
      learnMoreUrl: 'https://www.google.com',
    },
  ];

  tourData: PopOverData[] = [
    {
      header: 'Heading 1',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 2',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 3',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 4',
      description: 'This is body text of this tool tip',
    },
    {
      header: 'Heading 5',
      description: 'This is body text of this tool tip',
    },
  ];

  // Additional example with learn more URL
  learnMoreExampleData: PopOverData[] = [
    {
      header: 'Heading',
      description: 'This is body text of this tool tip',
      learnMoreUrl: 'https://www.google.com',
    },
  ];
}
