import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaBadgesComponent } from '@aava/play-core';

@Component({
  selector: 'ava-badges-sizes',
  standalone: true,
  imports: [CommonModule, AavaBadgesComponent],
  templateUrl: './badges-sizes.component.html',
  styleUrls: ['./badges-sizes.component.scss'],
})
export class BadgesSizesComponent {
  // Size examples
  sizeExamples = [
    {
      size: 'xs' as const,
      title: 'Extra Small Badges',
      description: 'Compact badges for dense interfaces and subtle indicators',
      count: 1,
      state: 'high-priority' as const,
    },
    {
      size: 'sm' as const,
      title: 'Small Badges',
      description: 'Compact badges for dense interfaces and subtle indicators',
      count: 5,
      state: 'medium-priority' as const,
    },
    {
      size: 'md' as const,
      title: 'Medium Badges',
      description: 'Standard size for most use cases (default)',
      count: 15,
      state: 'low-priority' as const,
    },
    {
      size: 'lg' as const,
      title: 'Large Badges',
      description:
        'Prominent badges for important notifications and better accessibility',
      count: 99,
      state: 'information' as const,
    },
  ];

  // Size comparison with different counts
  sizeComparison = [
    { count: 1, label: 'Single Digit' },
    { count: 10, label: 'Double Digit' },
    { count: 100, label: 'Triple Digit' },
    { count: 1000, label: 'Large Number' },
  ];

  // Event handlers
  onBadgeClick(event: Event): void {
    console.log('Badge clicked:', event);
  }
}
