import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaLinkComponent } from '@aava/play-core';

interface ActionLinkDocSection {
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
  selector: 'ava-app-actionlinks',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaLinkComponent],
  templateUrl: './app-actionlinks.component.html',
  styleUrl: './app-actionlinks.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppActionlinksComponent {
  // Documentation sections
  sections: ActionLinkDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Simple links with different color variants.',
      showCode: false,
    },
    {
      title: 'Link Sizes',
      description:
        'Available link sizes with responsive scaling: small, medium, and large.',
      showCode: false,
    },
    {
      title: 'Underlined Link',
      description: 'Links with underlined style.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'text',
      type: 'string',
      default: 'Action Link',
      description: 'The text content of the link.',
    },
    {
      name: 'color',
      type: "'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | 'Strin'",
      default: 'default',
      description: 'The visual style variant of the link.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: 'medium',
      description: 'The size of the link with responsive scaling.',
    },
    {
      name: 'underline',
      type: 'boolean',
      default: 'false',
      description: 'Whether the link is underlined.',
    },
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
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

  // Example code snippets
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `import { Component } from '@angular/core';
import { LinkComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-basic-links',
  standalone: true,
  imports: [LinkComponent],
  template: \`
    <div class="link-group">
      <aava-link text="Action Link" color="primary"></aava-link>
      <aava-link text="Action Link" color="success"></aava-link>
      <aava-link text="Action Link" color="warning"></aava-link>
      <aava-link text="Action Link" color="danger"></aava-link>
      <aava-link text="Action Link" color="info"></aava-link>
    </div>
  \`
})
export class BasicLinksComponent {}`,
      'link sizes': `import { Component } from '@angular/core';
import { LinkComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-link-sizes',
  standalone: true,
  imports: [LinkComponent],
  template: \`
    <div class="link-group">
      <aava-link text="Small Link" size="small"></aava-link>
      <aava-link text="Medium Link" size="medium"></aava-link>
      <aava-link text="Large Link" size="large"></aava-link>
    </div>
  \`
})
export class LinkSizesComponent {}`,
      'underlined link': `import { Component } from '@angular/core';
import { LinkComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-underlined-links',
  standalone: true,
  imports: [LinkComponent],
  template: \`
    <div class="link-group">
      <aava-link text="Underlined Link" [underline]="true"></aava-link>
    </div>
  \`
})
export class UnderlinedLinksComponent {}`,
    };

    return examples[section.toLowerCase()] || '';
  }
}
