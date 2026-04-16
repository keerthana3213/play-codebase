import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

export interface CustomColorTag {
  label: string;
  color: 'custom';
  size: 'lg';
  customStyle: Record<string, string>;
}

@Component({
  selector: 'ava-tags-colors',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-colors.component.html',
  styleUrls: ['./tags-colors.component.scss'],
})
export class TagsColorsComponent {
  customColorTags: CustomColorTag[] = [
    {
      label: 'Purple',
      color: 'custom',
      size: 'lg',
      customStyle: {
        '--tag-custom-bg': '#f3e8ff',
        '--tag-custom-color': '#7c3aed',
        '--tag-custom-border': '1px solid #7c3aed'
      }
    },
    {
      label: 'Pink',
      color: 'custom',
      size: 'lg',
      customStyle: {
        '--tag-custom-bg': '#fdf2f8',
        '--tag-custom-color': '#ec4899',
        '--tag-custom-border': '1px solid #ec4899'
      }
    },
    {
      label: 'Teal',
      color: 'custom',
      size: 'lg',
      customStyle: {
        '--tag-custom-bg': '#f0fdfa',
        '--tag-custom-color': '#14b8a6',
        '--tag-custom-border': '1px solid #14b8a6'
      }
    },
    {
      label: 'Orange',
      color: 'custom',
      size: 'lg',
      customStyle: {
        '--tag-custom-bg': '#fff7ed',
        '--tag-custom-color': '#ea580c',
        '--tag-custom-border': '1px solid #ea580c'
      }
    },
    {
      label: 'Indigo',
      color: 'custom',
      size: 'lg',
      customStyle: {
        '--tag-custom-bg': '#eef2ff',
        '--tag-custom-color': '#6366f1',
        '--tag-custom-border': '1px solid #6366f1'
      }
    }
  ];

  onTagClick(tagName: string): void {
    console.log(`${tagName} tag clicked!`);
  }
}
