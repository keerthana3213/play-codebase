import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-app-navbar',
  imports: [CommonModule],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent {

  // Tabs and Icons for Navbar
  tabs = ['Code', 'Preview', 'Logs'];
  rightIcons = ['awe_arrow_downward', 'awe_copy', 'awe_edit'];
  leftIcons = ['awe_home', 'awe_dock_to_right'];

  // Documentation Sections
  sections = [
    {
      title: 'Light Theme Navbar',
      description: 'A demonstration of the navbar with light theme.',
      showCode: false
    },
    {
      title: 'Dark Theme Navbar',
      description: 'A demonstration of the navbar with dark theme.',
      showCode: false
    },
    {
      title: 'Experience Studio Navbar',
      description: 'A demonstration of the Experience Studio navbar with Preview, Edit, and Export tabs.',
      showCode: false
    }
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    { name: 'tabs', type: 'Array<string>', default: '[]', description: 'An array of tab names displayed in the navbar.' },
    { name: 'rightIcons', type: 'Array<string>', default: '[]', description: 'An array of icons to be displayed on the right side of the navbar.' },
    { name: 'leftIcons', type: 'Array<string>', default: '[]', description: 'An array of icons to be displayed on the left side of the navbar.' },
    { name: 'layout', type: 'string', default: "'tabs-left'", description: 'Specifies the layout for the navbar.' },
    { name: 'mode', type: "'light' | 'dark'", default: "'light'", description: 'Sets the theme mode of the navbar.' }
  ];

  // Events
  events = [
    { name: 'tabClicked', type: 'EventEmitter<string>', description: 'Emitted when a tab is clicked.' },
    { name: 'iconClicked', type: 'EventEmitter<string>', description: 'Emitted when an icon is clicked.' }
  ];

  // Tab Click Handler
  onTabClick(tab: string) {
    console.log('Tab clicked:', tab);
  }

  // Icon Click Handler
  onIconClick(icon: string) {
    console.log('Icon clicked:', icon);
  }

  // Toggle Section Expansion
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
      'light theme navbar': `
  import { Component } from '@angular/core';
  import { NavbarComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-light-navbar',
    standalone: true,
    imports: [NavbarComponent],
    template: \`
      <awe-navbar
        mode="light"
        [tabs]="['Code', 'Preview', 'Logs']"
        [rightIcons]="['awe_arrow_downward', 'awe_copy', 'awe_edit']"
        layout="tabs-left"
        (tabClicked)="onTabClick($event)"
        (iconClicked)="onIconClick($event)">
      </awe-navbar>
      
      <awe-navbar
        mode="light"
        [tabs]="['History']"
        [leftIcons]="['awe_home', 'awe_dock_to_right']"
        layout="tabs-left"
        (tabClicked)="onTabClick($event)"
        (iconClicked)="onIconClick($event)">
      </awe-navbar>
    \`
  })
  export class LightNavbarComponent {
    onTabClick(tab: string) {
      console.log('Tab clicked:', tab);
    }
  
    onIconClick(icon: string) {
      console.log('Icon clicked:', icon);
    }
  }`,

      'dark theme navbar': `
  import { Component } from '@angular/core';
  import { NavbarComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-dark-navbar',
    standalone: true,
    imports: [NavbarComponent],
    template: \`
      <awe-navbar
        mode="dark"
        [tabs]="['Code', 'Preview', 'Logs']"
        [rightIcons]="['awe_arrow_downward', 'awe_copy', 'awe_edit']"
        layout="tabs-left"
        (tabClicked)="onTabClick($event)"
        (iconClicked)="onIconClick($event)">
      </awe-navbar>
      
      <awe-navbar
        mode="dark"
        [tabs]="['History']"
        [leftIcons]="['awe_home', 'awe_dock_to_right']"
        layout="tabs-left"
        (tabClicked)="onTabClick($event)"
        (iconClicked)="onIconClick($event)">
      </awe-navbar>
    \`
  })
  export class DarkNavbarComponent {
    onTabClick(tab: string) {
      console.log('Tab clicked:', tab);
    }
  
    onIconClick(icon: string) {
      console.log('Icon clicked:', icon);
    }
  }`,

      'experience studio navbar': `
  import { Component } from '@angular/core';
  import { NavbarComponent } from '@awe/@aava/play-core';
  
  @Component({
    selector: 'app-dark-navbar',
    standalone: true,
    imports: [NavbarComponent],
    template: \`
      <awe-navbar
        mode="light"
        [leftTabs]="['Preview', 'Edit']"
        [rightTabs]="['Export']"
        (tabClicked)="onTabClick($event)"
        (iconClicked)="onIconClick($event)"
      ></awe-navbar>
      <awe-navbar
        mode="dark"
        [leftTabs]="['Preview', 'Edit']"
        [rightTabs]="['Export']"
        (tabClicked)="onTabClick($event)"
        (iconClicked)="onIconClick($event)"
      ></awe-navbar>
    \`
  })
  export class ExperienceStudioNavbarComponent {
    onTabClick(tab: string) {
      console.log('Tab clicked:', tab);
    }
  
    onIconClick(icon: string) {
      console.log('Icon clicked:', icon);
    }
  }`

    };

    return examples[section] || '';
  }


  // Copy Code to Clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }
}
