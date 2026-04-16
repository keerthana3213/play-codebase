import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileAttachPillComponent, FileAttachOption } from '@aava/play-core';
import { FileAttachPillBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { FileAttachPillMixedIconsDemoComponent } from './demo/mixed-icons-demo/mixed-icons-demo.component';
import { FileAttachPillCustomMainIconDemoComponent } from './demo/custom-main-icon-demo/custom-main-icon-demo.component';
import { FileAttachPillThemeDemoComponent } from './demo/theme-demo/theme-demo.component';
import { FileAttachPillSizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface ApiEvent {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'awe-app-file-attach-pill',
  standalone: true,
  imports: [
    CommonModule,
    FileAttachPillBasicUsageDemoComponent,
    FileAttachPillMixedIconsDemoComponent,
    FileAttachPillCustomMainIconDemoComponent,
    FileAttachPillThemeDemoComponent,
    FileAttachPillSizesDemoComponent
  ],
  templateUrl: './app-file-attach-pill.component.html',
  styleUrls: ['./app-file-attach-pill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppFileAttachPillComponent {
  // Basic file attachment options
  fileOptions: FileAttachOption[] = [
    { name: 'From Computer', icon: 'upload', value: 'computer' },
    { name: 'From Cloud', icon: 'cloud-upload', value: 'cloud' },
    { name: 'From URL', icon: 'link', value: 'url' }
  ];

  // Mixed icon types - ava-icons and custom icons
  mixedOptions: FileAttachOption[] = [
    { name: 'From Computer', icon: 'upload', value: 'computer' }, // aava-icon
    { name: 'From Cloud', icon: 'assets/robot.png', value: 'cloud', useCustomIcon: true }, // custom
    { name: 'From URL', icon: 'link', value: 'url' } // aava-icon
  ];

  // Technology options with custom icons
  techOptions: FileAttachOption[] = [
    { name: 'Angular', icon: '/assets/awe_angular.svg', value: 'angular', useCustomIcon: true },
    { name: 'React', icon: '/assets/awe_react.svg', value: 'react', useCustomIcon: true },
    { name: 'Vue', icon: '/assets/awe_vue.svg', value: 'vue', useCustomIcon: true }
  ];

  // Design framework options
  designOptions: FileAttachOption[] = [
    { name: 'Material UI', icon: '/assets/awe_material.svg', value: 'material', useCustomIcon: true },
    { name: 'Bootstrap', icon: '/assets/awe_bootstrap.svg', value: 'bootstrap', useCustomIcon: true },
    { name: 'Tailwind', icon: '/assets/awe_tailwind.svg', value: 'tailwind', useCustomIcon: true }
  ];



  selectedOption: FileAttachOption | null = null;
  currentTheme: 'light' | 'dark' = 'dark';

  onOptionSelected(option: FileAttachOption): void {
    console.log('Selected option:', option);
    this.selectedOption = option;

    // Handle different option types
    switch (option.value) {
      case 'computer':
        this.openFileDialog();
        break;
      case 'cloud':
        this.openCloudDialog();
        break;
      case 'url':
        this.openUrlDialog();
        break;
      case 'light':
      case 'dark':
        this.currentTheme = option.value as 'light' | 'dark';
        break;
      default:
        console.log(`Selected: ${option.name}`);
    }
  }

  private openFileDialog(): void {
    console.log('Opening file dialog...');
    alert('File dialog opened. In a real implementation, this would allow selecting files from your computer.');
  }

  private openCloudDialog(): void {
    console.log('Opening cloud storage dialog...');
    alert('Cloud storage dialog opened. In a real implementation, this would allow selecting files from cloud storage.');
  }

  private openUrlDialog(): void {
    console.log('Opening URL dialog...');
    const url = prompt('Enter URL:');
    if (url) {
      console.log('URL entered:', url);
    }
  }

  // Documentation Sections
  sections = [
    {
      title: 'Basic Usage',
      description: 'Basic file attachment pill with default options and standard ava-icons.',
      showCode: false
    },
    {
      title: 'Mixed Icon Types',
      description: 'Demonstrates using both ava-icons and custom icon images in the same component.',
      showCode: false
    },
    {
      title: 'Custom Main Icon',
      description: 'Shows how to customize the main icon and text of the pill component.',
      showCode: false
    },

    {
      title: 'Different Icon Sizes',
      description: 'Shows how to use different icon sizes for the pill component.',
      showCode: false
    }
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'options',
      type: 'FileAttachOption[]',
      default: 'Default file options',
      description: 'Array of file attachment options to display in the dropdown'
    },
    {
      name: 'mainIcon',
      type: 'string',
      default: "'paperclip'",
      description: 'The main icon to display on the pill'
    },
    {
      name: 'useCustomMainIcon',
      type: 'boolean',
      default: 'false',
      description: 'Whether the main icon is a custom icon (URL/path) or aava-icon'
    },
    {
      name: 'mainText',
      type: 'string',
      default: "'Attach File'",
      description: 'The text to display when hovering over the pill'
    },
    {
      name: 'currentTheme',
      type: "'light' | 'dark'",
      default: "'light'",
      description: 'The current theme for styling the component'
    },
    {
      name: 'iconSize',
      type: 'number',
      default: '20',
      description: 'Size of the icons in pixels'
    }
  ];

  // Events
  events: ApiEvent[] = [
    {
      name: 'optionSelected',
      type: 'EventEmitter<FileAttachOption>',
      description: 'Emitted when a file attachment option is selected from the dropdown'
    }
  ];

  // Toggle Code Visibility
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Get Example Code for different sections
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
<aava-file-attach-pill
  [options]="fileOptions"
  (optionSelected)="onOptionSelected($event)">
</aava-file-attach-pill>

// Component
fileOptions: FileAttachOption[] = [
  { name: 'From Computer', icon: 'upload', value: 'computer' },
  { name: 'From Cloud', icon: 'cloud-upload', value: 'cloud' },
  { name: 'From URL', icon: 'link', value: 'url' }
];

onOptionSelected(option: FileAttachOption): void {
  console.log('Selected option:', option);
  // Handle the selected option
}`,

      'mixed icon types': `
<aava-file-attach-pill
  [options]="mixedOptions"
  (optionSelected)="onOptionSelected($event)">
</aava-file-attach-pill>

// Component
mixedOptions: FileAttachOption[] = [
  { name: 'From Computer', icon: 'upload', value: 'computer' }, // aava-icon
  { name: 'From Cloud', icon: 'assets/robot.png', value: 'cloud', useCustomIcon: true }, // custom
  { name: 'From URL', icon: 'link', value: 'url' } // aava-icon
];`,

      'custom main icon': `
<aava-file-attach-pill
  [options]="techOptions"
  mainText="Choose Framework"
  [mainIcon]="'assets/awe_angular.svg'"
  [useCustomMainIcon]="true"
  (optionSelected)="onOptionSelected($event)">
</aava-file-attach-pill>

// Component
techOptions: FileAttachOption[] = [
  { name: 'Angular', icon: '/assets/awe_angular.svg', value: 'angular', useCustomIcon: true },
  { name: 'React', icon: '/assets/awe_react.svg', value: 'react', useCustomIcon: true },
  { name: 'Vue', icon: '/assets/awe_vue.svg', value: 'vue', useCustomIcon: true }
];`,

      'theme support': `
<aava-file-attach-pill
  [options]="themeOptions"
  mainText="Theme"
  [currentTheme]="currentTheme"
  (optionSelected)="onOptionSelected($event)">
</aava-file-attach-pill>

// Component
themeOptions: FileAttachOption[] = [
  { name: 'Light Theme', icon: 'sun', value: 'light' },
  { name: 'Dark Theme', icon: 'moon', value: 'dark' },
  { name: 'Auto Theme', icon: 'monitor', value: 'auto' }
];

currentTheme: 'light' | 'dark' = 'light';`,

      'different icon sizes': `
<aava-file-attach-pill
  [options]="fileOptions"
  [iconSize]="24"
  mainText="Large Icons"
  (optionSelected)="onOptionSelected($event)">
</aava-file-attach-pill>

<aava-file-attach-pill
  [options]="fileOptions"
  [iconSize]="16"
  mainText="Small Icons"
  (optionSelected)="onOptionSelected($event)">
</aava-file-attach-pill>`
    };

    return examples[section] || '';
  }

  // Copy Code to Clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
      // You could show a toast notification here
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }

  // Toggle theme for demonstration
  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}