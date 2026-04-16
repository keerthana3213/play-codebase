import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaToggleComponent } from '@aava/play-core';

interface ToggleDocSection {
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
  selector: 'aava-toggle-documentation',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaToggleComponent],
  templateUrl: './app-toggle.component.html',
  styleUrls: ['./app-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppToggleComponent {
  sections: ToggleDocSection[] = [
    {
      title: 'Basic Usage',
      description:
        'Basic usage of the toggle component with a simple on/off switch.',
      showCode: false,
    },
    {
      title: 'Toggle Sizes',
      description:
        'Different available sizes for the toggle: small, medium, and large.',
      showCode: false,
    },
    {
      title: 'Disabled State',
      description: 'How to use the disabled state for the toggle.',
      showCode: false,
    },
    {
      title: 'Title positions in Toggle',
      description: 'Examples of toggle with title before and after.',
      showCode: false,
    },
    {
      title: 'Events Usage',
      description:
        'Example of handling events emitted by the toggle component.',
      showCode: false,
    },
    {
      title: 'Toggle with Icons',
      description:
        'Toggle switches with custom icons for checked and unchecked states.',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'size',
      type: 'ToggleSize',
      default: "'medium'",
      description: 'Sets the size of the toggle component.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'The title displayed next to the toggle.',
    },
    {
      name: 'position',
      type: 'TogglePosition',
      default: "'left'",
      description:
        'Defines the position of the title relative to the toggle switch.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the toggle when set to true.',
    },
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description:
        'Defines whether the toggle is checked (true) or not (false).',
    },
    {
      name: 'animation',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables animation during state transitions.',
    },
    {
      name: 'showIcons',
      type: 'boolean',
      default: 'false',
      description:
        'Enables icon display inside the toggle slider. Icons automatically use brand theme colors.',
    },
    {
      name: 'uncheckedIcon',
      type: 'string',
      default: "'x'",
      description:
        'Icon name to display when toggle is unchecked. Color is automatically derived from brand primary.',
    },
    {
      name: 'checkedIcon',
      type: 'string',
      default: "'check'",
      description:
        'Icon name to display when toggle is checked. Color is automatically derived from brand primary.',
    },
  ];

  events = [
    {
      name: 'checkedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the checked state changes.',
    },
  ];

  basicToggleEnabled: boolean = false;
  notificationsEnabled: boolean = false;
  darkModeEnabled: boolean = false;
  mediumToggleEnabled: boolean = true;
  animatedToggleEnabled: boolean = false;
  nonAnimatedToggleEnabled: boolean = true;
  eventToggleEnabled: boolean = false;

  // Icon toggle states
  iconToggleEnabled: boolean = false;
  iconToggle2Enabled: boolean = true;
  iconToggle3Enabled: boolean = false;

  toggleCodeVisibility(index: number, event: Event): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  onBasicToggle(checked: boolean): void {
    this.basicToggleEnabled = checked;
    console.log('Basic toggle:', checked ? 'enabled' : 'disabled');
  }

  onNotificationToggle(checked: boolean): void {
    this.notificationsEnabled = checked;
    console.log('Notifications:', checked ? 'enabled' : 'disabled');
  }

  onDarkModeToggle(checked: boolean): void {
    this.darkModeEnabled = checked;
    console.log('Dark mode:', checked ? 'enabled' : 'disabled');
  }

  onMediumToggle(checked: boolean): void {
    this.mediumToggleEnabled = checked;
    console.log('Medium toggle:', checked ? 'enabled' : 'disabled');
  }

  onAnimatedToggle(checked: boolean): void {
    this.animatedToggleEnabled = checked;
    console.log('Animated toggle:', checked ? 'enabled' : 'disabled');
  }

  onNonAnimatedToggle(checked: boolean): void {
    this.nonAnimatedToggleEnabled = checked;
    console.log('Non-animated toggle:', checked ? 'enabled' : 'disabled');
  }

  onEventToggle(checked: boolean): void {
    this.eventToggleEnabled = checked;
    console.log('Toggle event:', checked ? 'enabled' : 'disabled');
  }

  // Icon toggle event handlers
  onIconToggle(checked: boolean): void {
    this.iconToggleEnabled = checked;
    console.log('Icon toggle 1:', checked ? 'enabled' : 'disabled');
  }

  onIconToggle2(checked: boolean): void {
    this.iconToggle2Enabled = checked;
    console.log('Icon toggle 2:', checked ? 'enabled' : 'disabled');
  }

  onIconToggle3(checked: boolean): void {
    this.iconToggle3Enabled = checked;
    console.log('Icon toggle 3:', checked ? 'enabled' : 'disabled');
  }

  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
// TypeScript
import { Component } from '@angular/core';
import { ToggleComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-basic-toggle',
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <aava-toggle
      size="medium"
      title="Enable Notifications"
      position="left"
      [animation]="true">
    </aava-toggle>
  \`
})
export class BasicToggleComponent { }
      `,
      'toggle sizes': `
// TypeScript
import { Component } from '@angular/core';
import { ToggleComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-toggle-sizes',
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <aava-toggle
      size="small"
      title="Small Toggle"
      position="left"
      [checked]="true"
      [animation]="true">
    </aava-toggle>

    <aava-toggle
      size="medium"
      title="Medium Toggle"
      position="left"
      [checked]="mediumToggleEnabled"
      [animation]="true"
      (checkedChange)="onMediumToggle($event)">
    </aava-toggle>

    <aava-toggle
      size="large"
      title="Large Toggle"
      position="left"
      [checked]="false"
      [animation]="true">
    </aava-toggle>
  \`
})
export class ToggleSizesComponent {
  mediumToggleEnabled: boolean = true;

  onMediumToggle(checked: boolean): void {
    this.mediumToggleEnabled = checked;
    console.log('Medium toggle:', checked ? 'enabled' : 'disabled');
  }
}
      `,
      'disabled state': `
// TypeScript
import { Component } from '@angular/core';
import { ToggleComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-disabled-toggle',
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <aava-toggle
      size="medium"
      title="Disabled Toggle"
      position="left"
      [checked]="false"
      [disabled]="true"
      [animation]="true">
    </aava-toggle>
  \`
})
export class DisabledToggleComponent { }
      `,
      'title positions in toggle': `
// TypeScript
import { Component } from '@angular/core';
import { ToggleComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-title-toggle',
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <aava-toggle
      size="medium"
      title="Enable Notifications"
      position="left"
      [checked]="notificationsEnabled"
      [animation]="true"
      (checkedChange)="onNotificationToggle($event)">
    </aava-toggle>

    <aava-toggle
      size="medium"
      title="Dark Mode"
      position="right"
      [checked]="darkModeEnabled"
      [animation]="true"
      (checkedChange)="onDarkModeToggle($event)">
    </aava-toggle>
  \`
})
export class TitleToggleComponent {
  notificationsEnabled: boolean = false;
  darkModeEnabled: boolean = false;

  onNotificationToggle(checked: boolean): void {
    this.notificationsEnabled = checked;
    console.log('Notifications:', checked ? 'enabled' : 'disabled');
  }

  onDarkModeToggle(checked: boolean): void {
    this.darkModeEnabled = checked;
    console.log('Dark mode:', checked ? 'enabled' : 'disabled');
  }
}
      `,
      'events usage': `
// TypeScript
import { Component } from '@angular/core';
import { ToggleComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-events-toggle',
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <aava-toggle
      size="medium"
      title="Toggle with Event"
      position="left"
      [checked]="eventToggleEnabled"
      [animation]="true"
      (checkedChange)="onEventToggle($event)">
    </aava-toggle>
  \`
})
export class EventsToggleComponent {
  eventToggleEnabled: boolean = false;

  onEventToggle(checked: boolean): void {
    this.eventToggleEnabled = checked;
    console.log('Toggle event:', checked ? 'enabled' : 'disabled');
  }
}
      `,
      'toggle with icons': `
// TypeScript
import { Component } from '@angular/core';
import { ToggleComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-icon-toggle',
  standalone: true,
  imports: [ToggleComponent],
  template: \`
    <!-- Power icon when off, check icon when on (uses brand theme colors) -->
    <aava-toggle
      size="medium"
      title="Power Toggle"
      position="left"
      [showIcons]="true"
      uncheckedIcon="power"
      checkedIcon="check"
      [checked]="powerEnabled"
      [animation]="true"
      (checkedChange)="onPowerToggle($event)">
    </aava-toggle>

    <!-- Heart icon when off, check icon when on (uses brand theme colors) -->
    <aava-toggle
      size="large"
      title="Heart Toggle"
      position="left"
      [showIcons]="true"
      uncheckedIcon="heart"
      checkedIcon="check"
      [checked]="heartEnabled"
      [animation]="true"
      (checkedChange)="onHeartToggle($event)">
    </aava-toggle>

    <!-- X icon when off, check icon when on (uses brand theme colors) -->
    <aava-toggle
      size="small"
      title="X / Check Toggle"
      position="left"
      [showIcons]="true"
      uncheckedIcon="x"
      checkedIcon="check"
      [checked]="xCheckEnabled"
      [animation]="true"
      (checkedChange)="onXCheckToggle($event)">
    </aava-toggle>
  \`
})
export class IconToggleComponent {
  powerEnabled: boolean = false;
  heartEnabled: boolean = true;
  xCheckEnabled: boolean = false;

  onPowerToggle(checked: boolean): void {
    this.powerEnabled = checked;
    console.log('Power:', checked ? 'on' : 'off');
  }

  onHeartToggle(checked: boolean): void {
    this.heartEnabled = checked;
    console.log('Heart:', checked ? 'liked' : 'not liked');
  }

  onXCheckToggle(checked: boolean): void {
    this.xCheckEnabled = checked;
    console.log('X/Check:', checked ? 'valid' : 'invalid');
  }
}
      `,
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
        console.error('Failed to copy code: ', err);
      });
  }
}
