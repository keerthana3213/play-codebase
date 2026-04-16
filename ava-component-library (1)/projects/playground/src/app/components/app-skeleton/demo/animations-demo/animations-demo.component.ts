import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-animations-demo',
  standalone: true,
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './animations-demo.component.html',
  styleUrl: './animations-demo.component.scss',
})
export class AnimationsDemoComponent {
  // Demo data for different skeleton animations
  animationConfigs = [
    {
      width: '200px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description:
        'Wave - Smooth shimmer effect that moves across the skeleton',
    },
    {
      width: '200px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'pulse' as const,
      description:
        'Pulse - Gentle fade in/out effect for subtle loading states',
    },
    {
      width: '80px',
      height: '80px',
      shape: 'circle' as const,
      animation: 'wave' as const,
      description: 'Circle with wave animation',
    },
    {
      width: '80px',
      height: '80px',
      shape: 'circle' as const,
      animation: 'pulse' as const,
      description: 'Circle with pulse animation',
    },
  ];
}
