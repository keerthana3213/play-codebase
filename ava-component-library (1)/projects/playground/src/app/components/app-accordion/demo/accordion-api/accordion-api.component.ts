import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-api',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-api.component.html',
  styleUrls: ['./accordion-api.component.scss'],
})
export class AccordionApiComponent {
  // API properties
  apiProperties = [
    {
      name: 'expanded',
      type: 'boolean',
      default: 'false',
      description: 'Controls whether the accordion is expanded or collapsed',
      required: false,
    },
    {
      name: 'controlled',
      type: 'boolean',
      default: 'false',
      description: 'When true, the accordion state is controlled externally',
      required: false,
    },
    {
      name: 'animation',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables the expand/collapse animation',
      required: false,
    },
    {
      name: 'type',
      type: "'default' | 'titleIcon'",
      default: "'default'",
      description: 'The type of accordion layout to use',
      required: false,
    },
    {
      name: 'titleIcon',
      type: 'string',
      default: 'undefined',
      description: 'Icon name for the title area (used with titleIcon type)',
      required: false,
    },
    {
      name: 'iconClosed',
      type: 'string',
      default: "'chevron-right'",
      description: 'Icon name to display when accordion is collapsed',
      required: false,
    },
    {
      name: 'iconOpen',
      type: 'string',
      default: "'chevron-down'",
      description: 'Icon name to display when accordion is expanded',
      required: false,
    },
    {
      name: 'iconPosition',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Position of the expand/collapse icons',
      required: false,
    },
  ];

  // API events
  apiEvents = [
    {
      name: 'click',
      type: 'Event',
      description: 'Fired when the accordion header is clicked',
      payload: 'Native DOM event',
    },
  ];

  // API content projection
  apiContentProjection = [
    {
      selector: 'header',
      description: 'Content to display in the accordion header',
      required: true,
    },
    {
      selector: 'content',
      description: 'Content to display in the expandable accordion body',
      required: true,
    },
  ];

  // Usage examples
  usageExamples = [
    {
      title: 'Basic Usage',
      code: `<ava-accordion>
  <span header>Accordion Title</span>
  <div content>
    Accordion content goes here
  </div>
</ava-accordion>`,
    },
    {
      title: 'With Custom Icons',
      code: `<ava-accordion 
  iconClosed="plus"
  iconOpen="minus"
  iconPosition="right">
  <span header>Custom Icons</span>
  <div content>
    Content with custom icons
  </div>
</ava-accordion>`,
    },
    {
      title: 'Controlled Mode',
      code: `<ava-accordion 
  [expanded]="isExpanded"
  [controlled]="true"
  (click)="toggleAccordion()">
  <span header>Controlled Accordion</span>
  <div content>
    Externally controlled content
  </div>
</ava-accordion>`,
    },
    {
      title: 'Title Icon Type',
      code: `<ava-accordion 
  type="titleIcon"
  titleIcon="settings"
  iconClosed="chevron-down"
  iconOpen="chevron-up">
  <span header>Settings Panel</span>
  <div content>
    Settings content with title icon
  </div>
</ava-accordion>`,
    },
  ];

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }
}
