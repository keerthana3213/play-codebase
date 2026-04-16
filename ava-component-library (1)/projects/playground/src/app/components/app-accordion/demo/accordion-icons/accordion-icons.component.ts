import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-icons',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-icons.component.html',
  styleUrls: ['./accordion-icons.component.scss'],
})
export class AccordionIconsComponent {
  // Icon configurations
  iconConfigs = [
    {
      name: 'Plus/Minus',
      closed: 'plus',
      open: 'minus',
      position: 'right' as const,
      description: 'Clear expand/collapse indication with plus and minus icons',
    },
    {
      name: 'Chevron Right/Up',
      closed: 'chevron-right',
      open: 'chevron-up',
      position: 'left' as const,
      description: 'Traditional chevron icons with left positioning',
      expanded: false,
    },
  ];

  // Title icon examples
  titleIconExamples = [
    {
      title: 'Settings Panel',
      titleIcon: 'settings',
      closed: 'chevron-down',
      open: 'chevron-up',
      content: 'Account settings and configuration options',
    },
    {
      title: 'Documentation',
      titleIcon: 'file-text',
      closed: 'chevron-down',
      open: 'chevron-up',
      content: 'Help documentation and guides',
    },
    {
      title: 'Analytics',
      titleIcon: 'layout',
      closed: 'chevron-down',
      open: 'chevron-up',
      content: 'Data analytics and reporting tools',
    },
    {
      title: 'User Management',
      titleIcon: 'users',
      closed: 'chevron-down',
      open: 'chevron-up',
      content: 'User accounts and permissions',
    },
  ];

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }

  onIconClick(event: Event): void {
    console.log('Icon clicked:', event);
  }
}
