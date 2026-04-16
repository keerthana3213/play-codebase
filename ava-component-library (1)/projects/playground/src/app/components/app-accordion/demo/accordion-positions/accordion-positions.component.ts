import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-positions',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-positions.component.html',
  styleUrls: ['./accordion-positions.component.scss'],
})
export class AccordionPositionsComponent {
  // Position examples
  positionExamples = [
    {
      position: 'left' as const,
      title: 'Left Position (Default)',
      description: 'Icons positioned on the left side of the header',
      iconClosed: 'chevron-right',
      iconOpen: 'chevron-down',
    },
    {
      position: 'right' as const,
      title: 'Right Position',
      description:
        'Icons positioned on the right side for different visual emphasis',
      iconClosed: 'chevron-right',
      iconOpen: 'chevron-up',
    },
  ];

  // Mixed layout examples
  mixedLayouts = [
    {
      type: 'default' as const,
      position: 'left' as const,
      title: 'Default Type - Left Icons',
      description: 'Traditional accordion with left-positioned expand icons',
    },
    {
      type: 'titleIcon' as const,
      position: 'right' as const,
      titleIcon: 'settings',
      title: 'Title Icon Type - Right Icons',
      description: 'Static title icon with right-positioned expand control',
    },
  ];

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }
}
