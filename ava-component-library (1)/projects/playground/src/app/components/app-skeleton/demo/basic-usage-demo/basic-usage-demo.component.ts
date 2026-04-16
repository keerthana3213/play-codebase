import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class BasicUsageDemoComponent {
  // Demo data for basic skeleton usage
  skeletonConfigs = [
    {
      width: '100%',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Default skeleton for text content',
    },
    {
      width: '80%',
      height: '16px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Shorter text line',
    },
    {
      width: '60%',
      height: '16px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Even shorter text line',
    },
  ];
}
