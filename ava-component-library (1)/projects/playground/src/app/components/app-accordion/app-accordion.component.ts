import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaAccordionComponent } from '../../../../../play-core/src/lib/components/accordion/aava-accordion.component';
//import { AavaAccordionComponent } from '@aava/play-core';

interface AccordionDocSection {
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
  selector: 'ava-app-accordion',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaAccordionComponent],
  templateUrl: './app-accordion.component.html',
  styleUrls: ['./app-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppAccordionComponent {
  title = 'Accordion Title';
  description =
    'AI technology holds the promise of a smarter, more efficient world. As we continue to harness its power, collaboration between technologists, policymakers, and society will be key to navigating its challenges responsibly.';

  // Controlled mode demo properties
  controlledStates: boolean[] = [false, false, false];

  //activeIndex: number | null = 0;  // default open 1 accordion
  activeIndex: number | null = null; // All collapsed by default
  accordionItems: {
    title: string;
    description: string;
  }[] = [
      { title: this.title, description: this.description },
      { title: this.title, description: this.description },
      { title: this.title, description: this.description },
    ];

  setActiveAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  // Controlled mode methods
  openAll(): void {
    this.controlledStates = [true, true, true];
  }

  closeAll(): void {
    this.controlledStates = [false, false, false];
  }

  toggleFirst(): void {
    this.controlledStates[0] = !this.controlledStates[0];
  }

  toggleControlled(index: number): void {
    this.controlledStates[index] = !this.controlledStates[index];
  }

  sections: AccordionDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Simple accordion with basic functionality.',
      showCode: false,
    },
    {
      title: 'Accordion Types',
      description: 'Different types of accordions including dark and light.',
      showCode: false,
    },
    {
      title: 'Animations',
      description: 'Accordions with animation effects.',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'type',
      type: "'simple' | 'add' | 'dark' | 'light'",
      default: "'simple'",
      description: 'The type of the accordion.',
    },
    {
      name: 'animation',
      type: 'boolean',
      default: 'false',
      description: 'Whether to enable animations.',
    },
    {
      name: 'expanded',
      type: 'boolean',
      default: 'false',
      description: 'Whether the accordion is expanded by default.',
    },
    {
      name: 'hasFooter',
      type: 'boolean',
      default: 'false',
      description: 'Whether the accordion has a footer.',
    },
  ];

  toggleSection(index: number): void {
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
import { Component } from '@angular/core';
import { AccordionComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-basic-accordion',
  standalone: true,
  imports: [AccordionComponent],
  template: \`
    <awe-accordion type="simple" [animation]="false">
      <div header>
        <awe-heading variant="h6" type="regular">Accordion Heading</awe-heading>
      </div>
      <div content>
        <p>Content for the accordion...</p>
      </div>
    </awe-accordion>
  \`
})
export class BasicAccordionComponent {}`,
      'accordion types': `
import { Component } from '@angular/core';
import { AccordionComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-accordion-types',
  standalone: true,
  imports: [AccordionComponent],
  template: \`
    <awe-accordion type="dark" [animation]="false">
      <div header>
        <awe-heading variant="h6" type="regular">Dark Accordion</awe-heading>
      </div>
      <div content>
        <p>Content for dark accordion...</p>
      </div>
    </awe-accordion>
    <awe-accordion type="light" [animation]="false">
      <div header>
        <awe-heading variant="h6" type="regular">Light Accordion</awe-heading>
      </div>
      <div content>
        <p>Content for light accordion...</p>
      </div>
    </awe-accordion>
  \`
})
export class AccordionTypesComponent {}`,
      animations: `
import { Component } from '@angular/core';
import { AccordionComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-animated-accordion',
  standalone: true,
  imports: [AccordionComponent],
  template: \`
    <awe-accordion type="add" [animation]="true">
      <div header>
        <awe-heading variant="h6" type="regular">Accordion simple</awe-heading>
      </div>
      <div content>
        <p>Content with animation...</p>
      </div>
    </awe-accordion>
     <awe-accordion type="dark" [animation]="true">
      <div header>
        <awe-heading variant="h6" type="regular">Accordion Dark</awe-heading>
      </div>
      <div content>
        <p>Content with animation...</p>
      </div>
    </awe-accordion>
     <awe-accordion type="light" [animation]="true">
      <div header>
        <awe-heading variant="h6" type="regular">Accordion Light</awe-heading>
      </div>
      <div content>
        <p>Content with animation...</p>
      </div>
    </awe-accordion>
  \`
})
export class AnimatedAccordionComponent {}`,
    };

    return examples[section] || '';
  }

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
