import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

interface BasicExample {
  title: string;
  description: string;
  tags: {
    label: string;
    color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'custom';
    variant?: 'filled' | 'outlined';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    icon?: string;
    iconPosition?: 'start' | 'end';
    iconColor?: string;
    customStyle?: Record<string, string>;
    pill?: boolean;
    removable?: boolean;
  }[];
}

@Component({
  selector: 'ava-tags-basic-usage',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-basic-usage.component.html',
  styleUrls: ['./tags-basic-usage.component.scss'],
})
export class TagsBasicUsageComponent {
  basicExamples: BasicExample[] = [
    {
      title: 'Simple Tags',
      description: 'Basic tag implementations with labels and default styling.',
      tags: [
        { label: 'Default Tag' },
        { label: 'Outlined Tag', variant: 'outlined' },
        { label: 'Pill Tag', pill: true },
        { label: 'Outlined Pill Tag', variant: 'outlined', pill: true },
      ],
    },
  ];

  onTagClick(label: string) {
    console.log(`Tag clicked: ${label}`);
    alert(`Demo: Tag "${label}" was clicked!`);
  }

  onTagRemove(label: string) {
    console.log(`Tag removed: ${label}`);
    alert(`Demo: Tag "${label}" was removed!`);
  }

  getBasicGuidelines() {
    return [
      'Use semantic colors for consistent meaning across your application',
      'Choose appropriate sizes based on interface hierarchy and density',
      'Prefer outlined variants for secondary information',
      'Use icons to enhance visual recognition and meaning',
      'Ensure sufficient color contrast for accessibility',
    ];
  }
}
