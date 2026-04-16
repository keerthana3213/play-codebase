import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AavaButtonComponent, AavaTooltipDirective } from '@aava/play-core';

interface TooltipDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'ava-app-tooltip',
  standalone: true,
  imports: [CommonModule, RouterLink, AavaTooltipDirective],
  templateUrl: './app-tooltip.component.html',
  styleUrls: ['./app-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppTooltipComponent {
  // Quick start code for demo navigation
  quickStartCode = `<aava-button
  label="Save"
  variant="primary"
  tooltipDescription="Save your changes"
  tooltipPosition="top">
</aava-button>

<span tooltipDescription="Additional information">
  Highlighted text
</span>`;

  // Documentation Sections
  sections: TooltipDocSection[] = [
    {
      title: 'Basic Usage',
      description:
        'Basic usage of the tooltip component with a simple tooltip text.',
      showCode: false,
    },
    {
      title: 'Tooltip Positions',
      description:
        'How to set the position of the tooltip: top, bottom, left, or right.',
      showCode: false,
    },
    {
      title: 'Tooltip Sizes',
      description:
        'How to adjust the size of the tooltip: small, medium, or large.',
      showCode: false,
    },
    {
      title: 'Tooltip Variants',
      description:
        'How to adjust the size of the tooltip: small, medium, or large.',
      showCode: false,
    },
    {
      title: 'Tooltip with Heading and Body',
      description:
        'How to create tooltips with separate title and description parts using aavaTooltipTitle and aavaTooltipDescription.',
      showCode: false,
    },
    {
      title: 'Tooltip with Icons',
      description:
        'How to add icons to tooltips with user-defined icon names and colors. Icons are positioned to the left of content.',
      showCode: false,
    },
    {
      title: 'Tooltip with Guide and Buttons',
      description:
        'How to enable or disable animation effects when displaying the tooltip.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [

    {
      name: 'aavaTooltipTitle',
      type: 'string',
      default: '""',
      description: 'The title text for the tooltip with semi-bold 14px styling.',
    },
    {
      name: 'aavaTooltipDescription',
      type: 'string',
      default: '""',
      description: 'The description text for the tooltip with medium 10px styling.',
    },
    {
      name: 'aavaTooltipPosition',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description:
        'Defines the position of the tooltip relative to the element.',
    },
    {
      name: 'aavaTooltipArrow',
      type: "'start' | 'center' | 'end'",
      default: "'center'",
      description:
        'Defines the position of the tooltip arrow relative to the element.',
    },
    {
      name: 'aavaTooltipSize',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Sets the size of the tooltip.',
    },
    {
      name: 'aavaTooltipVariant',
      type: "'default'",
      default: 'default',
      description: 'Style variant of the tooltip.',
    },
    {
      name: 'aavaTooltipTrigger',
      type: "'hover' | 'click'",
      default: "'hover'",
      description:
        'Defines how the tooltip behaves when shown (hover or click).',
    },
    {
      name: 'aavaTooltipIcon',
      type: 'string',
      default: '""',
      description: 'The name of the icon to display (uses Lucide icon names).',
    },
    {
      name: 'aavaTooltipIconColor',
      type: 'string',
      default: '""',
      description: 'The color of the icon (hex, rgb, or named color).',
    },
  ];

  // Events
  events = [
    {
      name: 'onShow',
      type: 'EventEmitter<Event>',
      description: 'Emitted when the tooltip is shown.',
    },
    {
      name: 'onHide',
      type: 'EventEmitter<Event>',
      description: 'Emitted when the tooltip is hidden.',
    },
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Tooltip section expansion
  toggleSection(index: number): void {
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Example Code Generator
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': ` <aava-button label="Tooltip with Hover" variant="primary" size="medium" state="default"
              aavaTooltipDescription="Save your changes"
              aavaTooltipType="simple"
              aavaTooltipTrigger="hover"
              aavaTooltipPosition="top"
              aavaTooltipArrow="center"
              aavaTooltipSize="medium"
              aavaTooltipVariant="default"
              [aavaTooltipEnableAnimation]="true">
          </aava-button>`,
      'tooltip positions': ` <aava-button label="Top Tooltip" variant="primary" size="medium" state="default"
              aavaTooltipDescription="Top positioned tooltip"
              aavaTooltipPosition="top">
          </aava-button>
          <aava-button label="Bottom Tooltip" variant="primary" size="medium" state="default"
              aavaTooltipDescription="Bottom positioned tooltip"
              aavaTooltipPosition="bottom">
          </aava-button>`,
      'tooltip sizes': ` <aava-button label="Small Tooltip" variant="primary" size="medium" state="default"
              aavaTooltipDescription="Small tooltip"
              aavaTooltipSize="small">
          </aava-button>
          <aava-button label="Large Tooltip" variant="primary" size="medium" state="default"
              aavaTooltipDescription="Large tooltip"
              aavaTooltipSize="large">
          </aava-button>`,
      'tooltip with heading and body': ` <!-- Title Only -->
          <aava-button label="Title Only" variant="primary" size="medium" state="default"
              aavaTooltipTitle="Save Feature"
              aavaTooltipTrigger="hover"
              aavaTooltipPosition="top"
              aavaTooltipArrow="center">
          </aava-button>

          <!-- Description Only -->
          <aava-button label="Description Only" variant="secondary" size="medium" state="default"
              aavaTooltipDescription="This will store your progress and allow you to continue later."
              aavaTooltipTrigger="hover"
              aavaTooltipPosition="top"
              aavaTooltipArrow="center">
          </aava-button>

          <!-- Title + Description -->
          <aava-button label="Title + Description" variant="info" size="medium" state="default"
              aavaTooltipTitle="Save Feature"
              aavaTooltipDescription="This will store your progress and allow you to continue later."
              aavaTooltipTrigger="hover"
              aavaTooltipPosition="top"
              aavaTooltipArrow="center">
          </aava-button>`,
      'tooltip with icons': `<!-- Title with Icon -->
          <aava-button label="Save with Icon" variant="primary" size="medium" state="default"
              aavaTooltipTitle="Save Feature"
              aavaTooltipDescription="This will store your progress and allow you to continue later."
              aavaTooltipIcon="save"
              aavaTooltipIconColor="#ffffff"
              aavaTooltipTrigger="hover"
              aavaTooltipPosition="top"
              aavaTooltipArrow="center">
          </aava-button>

          <!-- Description with Icon -->
          <aava-button label="Info" variant="primary" size="medium" state="default"
              aavaTooltipDescription="This provides additional information about the feature."
              aavaTooltipIcon="info"
              aavaTooltipIconColor="#ffffff"
              aavaTooltipTrigger="hover"
              aavaTooltipPosition="top"
              aavaTooltipArrow="center">
          </aava-button>`,
    };

    return (
      examples[section.toLowerCase()] ||
      'No example available for this section.'
    );
  }

  // Copy Code to Clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
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
