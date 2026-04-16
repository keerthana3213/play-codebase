import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

interface IconExample {
  title: string;
  description: string;
  tags: {
    label: string;
    color: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    icon: string;
    iconPosition: 'start' | 'end';
    iconColor?: string;
  }[];
}

@Component({
  selector: 'ava-tags-icons',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-icons.component.html',
  styleUrls: ['./tags-icons.component.scss'],
})
export class TagsIconsComponent {
  iconExamples: IconExample[] = [
    {
      title: 'Leading Icons',
      description:
        'Icons positioned before the text for enhanced visual recognition',
      tags: [
        {
          label: 'Star',
          color: 'primary',
          icon: 'star',
          iconPosition: 'start',
        },
        {
          label: 'Check',
          color: 'success',
          icon: 'check-circle',
          iconPosition: 'start',
        },
        {
          label: 'Warning',
          color: 'warning',
          icon: 'alert-triangle',
          iconPosition: 'start',
        },
        {
          label: 'Error',
          color: 'error',
          icon: 'x-circle',
          iconPosition: 'start',
        },
        { label: 'Info', color: 'info', icon: 'info', iconPosition: 'start' },
      ],
    },
  ];

  onTagClick(label: string) {
    console.log(`Icon tag clicked: ${label}`);
    alert(`Demo: ${label} tag was clicked!`);
  }

  getIconDescription(position: string): string {
    return position === 'start'
      ? 'Icon appears before the text'
      : 'Icon appears after the text';
  }
}
