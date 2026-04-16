import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-card-skeleton-demo',
  standalone: true,
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './card-skeleton-demo.component.html',
  styleUrls: ['./card-skeleton-demo.component.scss'],
})
export class CardSkeletonDemoComponent {
  // Card skeleton type 1
  cardSkeletonElements = [
    {
      width: '100%',
      height: '200px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Card Image',
    },
    {
      width: '70%',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Card Title',
    },
    {
      width: '100%',
      height: '16px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Card Description Line 1',
    },
    {
      width: '100%',
      height: '16px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Card Description Line 2',
    },
    {
      width: '40%',
      height: '16px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description: 'Card Description Line 3',
    },
  ];

  // Card skeleton type 2
  cardSkeleton = [
    {
      width: '132px',
      height: '127px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Card Image',
    },
    {
      width: '132px',
      height: '8px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Card Title',
    },
    {
      width: '54px',
      height: '8px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Card Description Line 1',
    },
    {
      width: '40px',
      height: '8px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Card Description Line 2',
    },
    {
      width: '24px',
      height: '8px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Card Description Line 3',
    },
  ];
}
