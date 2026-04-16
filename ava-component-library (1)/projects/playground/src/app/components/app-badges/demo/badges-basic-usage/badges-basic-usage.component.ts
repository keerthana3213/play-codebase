import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaBadgesComponent } from '@aava/play-core';

@Component({
  selector: 'ava-badges-basic-usage',
  standalone: true,
  imports: [CommonModule, AavaBadgesComponent],
  templateUrl: './badges-basic-usage.component.html',
  styleUrls: ['./badges-basic-usage.component.scss'],
})
export class BadgesBasicUsageComponent {
  // Basic badge examples
  basicExamples = [
    {
      title: 'Simple Count Badge',
      description: 'Basic badge with a numerical count',
      count: 5,
      state: 'neutral' as const,
      size: 'md' as const,
    },
    {
      title: 'Priority Badge',
      description: 'Badge with priority state for important notifications',
      count: 3,
      state: 'high-priority' as const,
      size: 'md' as const,
    },
    {
      title: 'Success Badge',
      description: 'Badge indicating successful completion',
      count: 12,
      state: 'low-priority' as const,
      size: 'md' as const,
    },
    {
      title: 'Information Badge',
      description: 'Badge for informational content',
      count: 8,
      state: 'information' as const,
      size: 'md' as const,
    },
  ];

  // Event handlers
  onBadgeClick(event: Event): void {
    console.log('Badge clicked:', event);
  }

  onBadgeKeyPress(event: Event): void {
    console.log('Badge key pressed:', event);
  }
}
