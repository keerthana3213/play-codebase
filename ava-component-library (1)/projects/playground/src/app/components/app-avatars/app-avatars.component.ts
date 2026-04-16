import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaAvatarsComponent } from '@aava/play-core';

interface AvatarDocSection {
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
  selector: 'ava-avatars-documentation',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaAvatarsComponent],
  templateUrl: './app-avatars.component.html',
  styleUrls: ['./app-avatars.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppAvatarsComponent {
  sampleImageUrl = 'assets/1.png';

  sections: AvatarDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Demonstrates basic usage of avatars.',
      showCode: false,
    },
    {
      title: 'Large Avatars',
      description: 'Demonstrates avatars with large size.',
      showCode: false,
    },
    {
      title: 'Medium Avatars',
      description: 'Demonstrates avatars with medium size.',
      showCode: false,
    },
    {
      title: 'Small Avatars',
      description: 'Demonstrates avatars with small size.',
      showCode: false,
    },
    {
      title: 'Avatars with Text',
      description: 'Displays avatars with status and profile text.',
      showCode: false,
    },
    {
      title: 'Avatars with Events',
      description: 'Displays avatars with click events.',
      showCode: false,
    },
    {
      title: 'Processed and Done State',
      description:
        'Demonstrates avatars with the processedanddone state, which shows a continuous rotating border animation.',
      showCode: false,
    },
    {
      title: 'Active State',
      description:
        'Demonstrates avatars with the active state, which highlights the avatar with a colored border.',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'size',
      type: 'string',
      default: 'medium',
      description: 'The size of the avatar.',
    },
    {
      name: 'shape',
      type: 'string',
      default: 'circle',
      description: 'The shape of the avatar.',
    },
    {
      name: 'imageUrl',
      type: 'string',
      default: '""',
      description: 'The URL of the image to display in the avatar.',
    },
    {
      name: 'badgeState',
      type: 'string',
      default: 'neutral',
      description:
        'The state of the badge which defines its color scheme. (Optional)',
    },
    {
      name: 'badgeSize',
      type: 'string',
      default: 'medium',
      description: 'The size of the badge. (Optional)',
    },
    {
      name: 'badgeCount',
      type: 'number',
      default: '0',
      description: 'The numerical value to display in the badge. (Optional)',
    },
    {
      name: 'statusText',
      type: 'string',
      default: '""',
      description: 'The status text to display below the avatar. (Optional)',
    },
    {
      name: 'profileText',
      type: 'string',
      default: '""',
      description: 'The profile text to display below the avatar. (Optional)',
    },
    {
      name: 'processedanddone',
      type: 'boolean',
      default: 'false',
      description:
        'Shows a continuous rotating border animation around the avatar.',
    },
    {
      name: 'active',
      type: 'boolean',
      default: 'false',
      description:
        'Highlights the avatar with a colored border to indicate it is active.',
    },
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getAvatarCode(sectionTitle: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
      import { Component } from '@angular/core';
      import { AvatarsComponent } from '@awe/@aava/play-core';
      
      @Component({
        selector: 'app-basic-usage',
        standalone: true,
        imports: [AvatarsComponent],
        template: \`
          <section class="comp-container">
            <aava-avatars
              size="lg"
              shape="pill"
              [imageUrl]="sampleImageUrl"
              altText="User avatar">
            </aava-avatars>
          </section>
        \`
      })
      export class BasicUsageComponent {
        sampleImageUrl = 'assets/avatar.jpg';
      }
      `,
      'large avatars': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-large-avatars',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="large"
        shape="pill"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="high-priority"
        badgeSize="large"
        [badgeCount]="1">
      </aava-avatars>
      <aava-avatars
        size="large"
        shape="square"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="high-priority"
        badgeSize="large"
        [badgeCount]="1">
      </aava-avatars>
    </section>
  \`
})
export class LargeAvatarsComponent {
  sampleImageUrl = 'assets/avatar.jpg';
}
`,
      'medium avatars': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-medium-avatars',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="md"
        shape="pill"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="medium-priority"
        badgeSize="medium"
        [badgeCount]="1">
      </aava-avatars>
      <aava-avatars
        size="md"
        shape="square"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="medium-priority"
        badgeSize="medium"
        [badgeCount]="1">
      </aava-avatars>
    </section>
  \`
})
export class MediumAvatarsComponent {
  sampleImageUrl = 'assets/avatar.jpg';
}
`,
      'small avatars': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-small-avatars',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="sm"
        shape="pill"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="low-priority"
        badgeSize="small"
        [badgeCount]="1">
      </aava-avatars>
      <aava-avatars
        size="sm"
        shape="square"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="low-priority"
        badgeSize="small"
        [badgeCount]="1">
      </aava-avatars>
    </section>
  \`
})
export class SmallAvatarsComponent {
  sampleImageUrl = 'assets/avatar.jpg';
}
`,
      'avatars with text': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-avatars-with-text',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="large"
        shape="pill"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="information"
        badgeSize="large"
        [badgeCount]="1"
        statusText="Online"
        profileText="ascendion.hyderabad">
      </aava-avatars>
      <aava-avatars
        [imageUrl]="sampleImageUrl"
        profileText="John Doe">
      </aava-avatars>
    </section>
  \`
})
export class AvatarsWithTextComponent {
  sampleImageUrl = 'assets/avatar.jpg';
}
`,
      'avatars with events': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-avatars-with-events',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="large"
        shape="pill"
        [imageUrl]="sampleImageUrl"
        altText="User avatar"
        badgeState="information"
        badgeSize="large"
        [badgeCount]="7"
        statusText="Online"
        profileText="ascendion.hyderabad"
        (click)="handleIconClick()">
      </aava-avatars>
    </section>
  \`
})
export class AvatarsWithEventsComponent {
  sampleImageUrl = 'assets/avatar.jpg';
  handleIconClick() {
    console.log("Icon clicked");
  }
}
`,
      'processed and done state': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-processed-done-avatars',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="large"
        [imageUrl]="sampleImageUrl"
        [processedanddone]="true">
      </aava-avatars>
      <aava-avatars
        size="large"
        shape="square"
        [imageUrl]="sampleImageUrl"
        [processedanddone]="true">
      </aava-avatars>
      <aava-avatars
        size="large"
        [imageUrl]="sampleImageUrl"
        [processedanddone]="true"
        [gradientColors]="['#ff0000', '#ff00ff']">
      </aava-avatars>
           
      <aava-avatars
        size="large"
        shape="square"
        [imageUrl]="sampleImageUrl"
        [processedanddone]="true"
        [gradientColors]="['#4299e1', '#48bb78']">
      </aava-avatars>
     
    </section>
  \`
})
export class ProcessedDoneAvatarsComponent {
  sampleImageUrl = 'assets/avatar.jpg';
}
`,
      'active state': `
import { Component } from '@angular/core';
import { AvatarsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-active-avatars',
  standalone: true,
  imports: [AvatarsComponent],
  template: \`
    <section class="comp-container">
      <aava-avatars
        size="large"
        [imageUrl]="sampleImageUrl"
        [active]="true">
      </aava-avatars>
      <aava-avatars
        size="large"
        shape="square"
        [imageUrl]="sampleImageUrl"
        [active]="true">
      </aava-avatars>

 
    </section>
  \`
})
export class ActiveAvatarsComponent {
  sampleImageUrl = 'assets/avatar.jpg';
}
`,
    };

    return examples[sectionTitle.toLowerCase()] || '';
  }

  copyCode(sectionTitle: string): void {
    const code = this.getAvatarCode(sectionTitle);
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

  handleIconClick(): void {
    console.log('Icon clicked');
  }
}
