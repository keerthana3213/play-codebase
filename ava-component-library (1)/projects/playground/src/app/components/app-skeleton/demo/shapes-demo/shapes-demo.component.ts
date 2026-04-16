import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-shapes-demo',
  standalone: true,
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './shapes-demo.component.html',
  styleUrl: './shapes-demo.component.scss',
})
export class ShapesDemoComponent {
  // Demo data for different skeleton shapes
  shapeConfigs = [
    {
      width: '200px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      description:
        'Rectangle - Default shape for text lines and content blocks',
    },
    {
      width: '80px',
      height: '80px',
      shape: 'circle' as const,
      animation: 'pulse' as const,
      description: 'Circle - Perfect for avatars and profile pictures',
    },
    {
      width: '150px',
      height: '100px',
      shape: 'rounded' as const,
      animation: 'wave' as const,
      description: 'Rounded - Soft corners for modern UI elements',
    },
    {
      width: '100px',
      height: '100px',
      shape: 'square' as const,
      animation: 'wave' as const,
      description: 'Square - Sharp corners for structured content',
    },
  ];
}
