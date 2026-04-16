import { Component, ViewEncapsulation } from '@angular/core';
import { ExperienceHistoryCardsComponent } from "../../../../../@aava/play-core/src/lib/components/experience-history-cards/experience-history-cards.component";
import { CommonModule } from '@angular/common';
import { IconsComponent } from "@aava/play-core";

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-app-experience-history-cards',
  imports: [ExperienceHistoryCardsComponent, CommonModule, IconsComponent],
  templateUrl: './app-experience-history-cards.component.html',
  styleUrls: ['./app-experience-history-cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppExperienceHistoryCardsComponent {

  // History Card Image and Title properties
  image = 'assets/images/history_card.png';
  title = 'Version 1 Application';

  // Documentation Sections for History Cards Component
  sections = [
    {
      title: 'Basic Usage',
      description: 'This section demonstrates the basic usage of the history card component with an image and title.',
      showCode: false
    },
    {
      title: 'History Card light Theme',
      description: 'Toggle between light themes for history cards.',
      showCode: false
    },
    {
      title: 'History Card dark Theme',
      description: 'Toggle between dark themes for history cards.',
      showCode: false
    }

  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'imageUrl',
      type: 'string',
      default: '""',
      description: 'The URL to the image displayed on the history card.'
    },
    {
      name: 'title',
      type: 'string',
      default: '""',
      description: 'The title text displayed on the history card.'
    },
    {
      name: 'mode',
      type: "'light' | 'dark'",
      default: "'light'",
      description: 'Sets the theme for the history card (light or dark).'
    }
  ];

  // Events
  events = [
    {
      name: 'onHistoryClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the history card icon is clicked.'
    },
    {
      name: 'onExternalLinkClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the external link icon is clicked.'
    }
  ];

  // Toggle Section Expansion (for showing code examples)
  toggleSection(index: number): void {
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Toggle Code Visibility (to show or hide the code examples)
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Get Example Code for a Section
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
  import { Component } from '@angular/core';
  import { ExperienceHistoryCardsComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-basic-history-card',
    standalone: true,
    imports: [ExperienceHistoryCardsComponent],
    template: \`
      <awe-experience-history-cards
        [imageUrl]="image"
        [title]="title"
        [mode]="'light'"
        (onHistoryClick)="onHistoryClicked()"
        (onExternalLinkClick)="onExternalLinkClicked()">
      </awe-experience-history-cards>
    \`
  })
  export class BasicHistoryCardComponent {
    image = 'assets/images/history_card.png';
    title = 'Version 1 Application';
  
    onHistoryClicked() {
      console.log('History icon clicked!');
    }
  
    onExternalLinkClicked() {
      console.log('External link icon clicked!');
    }
  }`,

      'history card light theme': `
  import { Component } from '@angular/core';
  import { ExperienceHistoryCardsComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-history-card-light',
    standalone: true,
    imports: [ExperienceHistoryCardsComponent],
    template: \`
      <awe-experience-history-cards
        [imageUrl]="image"
        [title]="title"
        [mode]="'light'"
        (onHistoryClick)="onHistoryClicked()"
        (onExternalLinkClick)="onExternalLinkClicked()">
      </awe-experience-history-cards>
    \`
  })
  export class HistoryCardLightComponent {
    image = 'assets/images/history_card.png';
    title = 'Light Theme History Card';
  
    onHistoryClicked() {
      console.log('History icon clicked!');
    }
  
    onExternalLinkClicked() {
      console.log('External link icon clicked!');
    }
  }`,

      'history card dark theme': `
  import { Component } from '@angular/core';
  import { ExperienceHistoryCardsComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-history-card-dark',
    standalone: true,
    imports: [ExperienceHistoryCardsComponent],
    template: \`
      <awe-experience-history-cards
        [imageUrl]="image"
        [title]="title"
        [mode]="'dark'"
        (onHistoryClick)="onHistoryClicked()"
        (onExternalLinkClick)="onExternalLinkClicked()">
      </awe-experience-history-cards>
    \`
  })
  export class HistoryCardDarkComponent {
    image = 'assets/images/history_card.png';
    title = 'Dark Theme History Card';
  
    onHistoryClicked() {
      console.log('History icon clicked!');
    }
  
    onExternalLinkClicked() {
      console.log('External link icon clicked!');
    }
  }`
    };

    return examples[section] || '';
  }



  // Copy Code to Clipboard (for the code example)
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }

  // Methods triggered by events
  onHistoryClicked() {
    console.log('History icon clicked!');
    window.open('https://example.com', '_blank');
  }

  onExternalLinkClicked() {
    console.log('External link icon clicked!');
    window.open('https://example.com', '_blank');
  }
}
