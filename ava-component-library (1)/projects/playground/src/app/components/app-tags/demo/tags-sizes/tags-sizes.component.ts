import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

interface SizeExample {
  size: 'sm' | 'md' | 'lg';
  label: string;
  description: string;
  useCase: string;
  icon?: string;
}

interface TagExample {
  label: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  icon?: string;
}

@Component({
  selector: 'ava-tags-sizes',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-sizes.component.html',
  styleUrls: ['./tags-sizes.component.scss'],
})
export class TagsSizesComponent {
  sizeExamples: SizeExample[] = [
    {
      size: 'sm',
      label: 'Small Tag',
      description: 'Compact size for dense layouts and secondary information',
      useCase: 'Inline text, dense lists, secondary labels',
      icon: 'tag',
    },
    {
      size: 'md',
      label: 'Medium Tag',
      description: 'Standard size for most use cases',
      useCase: 'General purpose, primary content, main navigation',
      icon: 'star',
    },
    {
      size: 'lg',
      label: 'Large Tag',
      description: 'Prominent size for important information and touch targets',
      useCase: 'Important status, mobile interfaces, touch interactions',
      icon: 'check-circle',
    },
  ];

  sizeComparison = [
    {
      title: 'Primary Tags',
      description: 'Comparing all sizes with primary color',
      tags: [
        {
          label: 'ExtraSmall',
          size: 'xs',
          color: 'default',
        },
        {
          label: 'Small',
          size: 'sm',
          color: 'default',
        },
        {
          label: 'Medium',
          size: 'md',
          color: 'default',
        },
        {
          label: 'Large',
          size: 'lg',
          color: 'default',
        },
        {
          label: 'ExtraLarge',
          size: 'xl',
          color: 'default',
        },
      ] as TagExample[],
    },
  ];

  useCaseExamples = [
    {
      title: 'Small Tags',
      description: 'Perfect for dense layouts and inline content',
      examples: [
        { label: 'Tag', size: 'sm', color: 'default' },
        { label: 'New', size: 'sm', color: 'success' },
        { label: 'Beta', size: 'sm', color: 'warning' },
        { label: 'Pro', size: 'sm', color: 'primary' },
      ] as TagExample[],
    },
    {
      title: 'Medium Tags',
      description: 'Standard size for most interface elements',
      examples: [
        {
          label: 'Category',
          size: 'md',
          color: 'primary',
          icon: 'folder',
        },
        {
          label: 'Status',
          size: 'md',
          color: 'success',
          icon: 'check-circle',
        },
        {
          label: 'Priority',
          size: 'md',
          color: 'warning',
          icon: 'alert-triangle',
        },
        {
          label: 'Type',
          size: 'md',
          color: 'info',
          icon: 'info',
        },
      ] as TagExample[],
    },
    {
      title: 'Large Tags',
      description: 'Prominent display for important information',
      examples: [
        {
          label: 'Featured',
          size: 'lg',
          color: 'primary',
          icon: 'star',
        },
        {
          label: 'Active',
          size: 'lg',
          color: 'success',
          icon: 'check-circle',
        },
        {
          label: 'Critical',
          size: 'lg',
          color: 'error',
          icon: 'x-circle',
        },
        {
          label: 'Important',
          size: 'lg',
          color: 'warning',
          icon: 'alert-triangle',
        },
      ] as TagExample[],
    },
  ];

  sizeGuidelines = [
    {
      title: 'Small (sm)',
      items: [
        'Use in dense layouts and lists',
        'Secondary or supplementary information',
        'Inline text and compact interfaces',
        'Mobile-first designs with limited space',
      ],
    },
    {
      title: 'Medium (md)',
      items: [
        'Default size for most use cases',
        'Primary content and navigation',
        'Standard interface elements',
        'Balanced readability and space efficiency',
      ],
    },
    {
      title: 'Large (lg)',
      items: [
        'Important status and alerts',
        'Touch-friendly mobile interfaces',
        'Prominent feature highlights',
        'Accessibility considerations for larger text',
      ],
    },
  ];

  onTagClick(label: string) {
    console.log(`Size tag clicked: ${label}`);
    alert(`Demo: ${label} tag was clicked!`);
  }

  getSizeDescription(size: string): string {
    const descriptions: Record<string, string> = {
      sm: 'Compact size for dense layouts',
      md: 'Standard size for most use cases',
      lg: 'Prominent size for important information',
    };
    return descriptions[size] || 'Custom size variant';
  }
}
