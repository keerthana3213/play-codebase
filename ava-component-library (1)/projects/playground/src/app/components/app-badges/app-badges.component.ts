import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaBadgesComponent, AavaIconComponent } from '@aava/play-core';

interface BadgeDocSection {
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
  selector: 'ava-app-badges',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaBadgesComponent, AavaIconComponent],
  templateUrl: './app-badges.component.html',
  styleUrls: ['./app-badges.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppBadgesComponent {
  sections: BadgeDocSection[] = [
    {
      title: 'Large Size Badges',
      description: 'Demonstrates badges with large size.',
      showCode: false,
    },
    {
      title: 'Medium Size Badges',
      description: 'Demonstrates badges with medium size.',
      showCode: false,
    },
    {
      title: 'Small Size Badges',
      description: 'Demonstrates badges with small size.',
      showCode: false,
    },
    {
      title: 'Badges with Icons',
      description: 'Displays badges with icons.',
      showCode: false,
    },
    {
      title: 'Badges with Text',
      description: 'Displays badges with text.',
      showCode: false,
    },
    {
      title: 'Types of Badges',
      description:
        'Displays different types of badges such as high-priority, medium-priority, low-priority, neutral, and information.',
      showCode: false,
    },
    {
      title: 'Dot Badges',
      description:
        'Displays different Dot badges such as high-priority, medium-priority, low-priority, neutral, and information.',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'state',
      type: 'string',
      default: 'netural',
      description: 'The state of the badge which defines its color scheme.',
    },
    {
      name: 'size',
      type: 'string',
      default: 'medium',
      description: 'The size of the badge.',
    },
    {
      name: 'count',
      type: 'number',
      default: '0',
      description: 'The numerical value to display in the badge.',
    },
    {
      name: 'iconName',
      type: 'string',
      default: '""',
      description: 'The name of the icon to display in the badge.',
    },
    {
      name: 'iconColor',
      type: 'string',
      default: 'black',
      description: 'The color of the icon.',
    },
    {
      name: 'iconSize',
      type: 'number',
      default: '12',
      description: 'The size of the icon.',
    },
  ];

  toggleCodeVisibility(index: number, event: MouseEvent | Event): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getBadgeCode(sectionTitle: string): string {
    const examples: Record<string, string> = {
      'large size badges': `
import { Component } from '@angular/core';
import { BadgesComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-large-size-badges',
  standalone: true,
  imports: [BadgesComponent],
  template: \`
    <section class="comp-container">
      <ava-badges state="information" size="large" [count]="1"></ava-badges>
      <ava-badges state="information" size="large" [count]="10"></ava-badges>
      <ava-badges state="information" size="large" [count]="100"></ava-badges>
      <ava-badges state="information" size="large" [count]="1000"></ava-badges>
    </section>
\`
})
export class LargeSizeBadgesComponent { }
`,
      'medium size badges': `
import { Component } from '@angular/core';
import { BadgesComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-medium-size-badges',
  standalone: true,
  imports: [BadgesComponent],
  template: \`
    <section class="comp-container">
      <ava-badges state="low-priority" size="medium" [count]="1"></ava-badges>
      <ava-badges state="low-priority" size="medium" [count]="10"></ava-badges>
      <ava-badges state="low-priority" size="medium" [count]="100"></ava-badges>
      <ava-badges state="low-priority" size="medium" [count]="1000"></ava-badges>
    </section>
\`
})
export class MediumSizeBadgesComponent { }
`,
      'small size badges': `
import { Component } from '@angular/core';
import { BadgesComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-small-size-badges',
  standalone: true,
  imports: [BadgesComponent],
  template: \`
    <section class="comp-container">
      <ava-badges state="medium-priority" size="small" [count]="1"></ava-badges>
      <ava-badges state="medium-priority" size="small" [count]="10"></ava-badges>
      <ava-badges state="medium-priority" size="small" [count]="100"></ava-badges>
      <ava-badges state="medium-priority" size="small" [count]="1000"></ava-badges>
    </section>
\`
})
export class SmallSizeBadgesComponent { }
`,
      'badges with icons': `
import { Component } from '@angular/core';
import { BadgesComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-badges-with-icons',
  standalone: true,
  imports: [BadgesComponent],
  template: \`
    <section class="comp-container">
      <ava-badges state="high-priority" size="large" iconName="Mail" iconColor="white" [iconSize]="12"></ava-badges>
      <ava-badges state="high-priority" size="medium" iconName="wifi" iconColor="white" [iconSize]="12"></ava-badges>
      <ava-badges state="high-priority" size="small" iconName="user" iconColor="white" [iconSize]="12"></ava-badges>
    </section>
\`
})
export class BadgesWithIconsComponent { }
`,
      'badges with text': `
import { Component } from '@angular/core';
import { BadgesComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-badges-with-text',
  standalone: true,
  imports: [BadgesComponent],
  template: \`
    <section class="comp-container">
      <ava-badges state="high-priority" size="large" [count]="3"></ava-badges>
      <ava-badges state="medium-priority" size="medium" [count]="15"></ava-badges>
      <ava-badges state="low-priority" size="small" [count]="999"></ava-badges>
    </section>
\`
})
export class BadgesWithTextComponent { }
`,
      'types of badges': `
import { Component } from '@angular/core';
import { BadgesComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-types-of-badges',
  standalone: true,
  imports: [BadgesComponent],
  template: \`
    <section class="comp-container">
      <div class="demo-section">
        <h4>High Priority</h4>
        <div class="badge-row">
          <ava-badges state="high-priority" size="large" [count]="3"></ava-badges>
          <ava-badges state="high-priority" size="medium" [count]="3"></ava-badges>
          <ava-badges state="high-priority" size="small" [count]="3"></ava-badges>
        </div>
      </div>
      <div class="demo-section">
        <h4>Medium Priority</h4>
        <div class="badge-row">
          <ava-badges state="medium-priority" size="large" [count]="4"></ava-badges>
          <ava-badges state="medium-priority" size="medium" [count]="4"></ava-badges>
          <ava-badges state="medium-priority" size="small" [count]="4"></ava-badges>
        </div>
      </div>
      <div class="demo-section">
        <h4>Low Priority</h4>
        <div class="badge-row">
          <ava-badges state="low-priority" size="large" [count]="4"></ava-badges>
          <ava-badges state="low-priority" size="medium" [count]="4"></ava-badges>
          <ava-badges state="low-priority" size="small" [count]="4"></ava-badges>
        </div>
      </div>
      <div class="demo-section">
        <h4>Neutral</h4>
        <div class="badge-row">
          <ava-badges state="neutral" size="large" [count]="4"></ava-badges>
          <ava-badges state="neutral" size="medium" [count]="4"></ava-badges>
          <ava-badges state="neutral" size="small" [count]="4"></ava-badges>
        </div>
      </div>
      <div class="demo-section">
        <h4>Information</h4>
        <div class="badge-row">
          <ava-badges state="information" size="large" [count]="4"></ava-badges>
          <ava-badges state="information" size="medium" [count]="4"></ava-badges>
          <ava-badges state="information" size="small" [count]="4"></ava-badges>
        </div>
      </div>
    </section>
\`
})
export class TypesOfBadgesComponent { }
`,
    };

    return examples[sectionTitle.toLowerCase()] || '';
  }

  copyCode(sectionTitle: string): void {
    const code = this.getBadgeCode(sectionTitle);
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
    document.body.removeChild(textarea);
  }
}
