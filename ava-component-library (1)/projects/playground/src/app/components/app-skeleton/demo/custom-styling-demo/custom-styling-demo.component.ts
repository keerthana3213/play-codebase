import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSkeletonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-custom-styling-demo',
  standalone: true,
  imports: [CommonModule, AavaSkeletonComponent],
  templateUrl: './custom-styling-demo.component.html',
  styleUrl: './custom-styling-demo.component.scss',
})
export class CustomStylingDemoComponent {
  // Demo data for custom styling
  customConfigs = [
    {
      width: '200px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'wave' as const,
      backgroundColor: '#e3f2fd',
      description: 'Light blue background',
    },
    {
      width: '200px',
      height: '20px',
      shape: 'rectangle' as const,
      animation: 'pulse' as const,
      backgroundColor: '#f3e5f5',
      description: 'Light purple background',
    },
    {
      width: '80px',
      height: '80px',
      shape: 'circle' as const,
      animation: 'wave' as const,
      backgroundColor: '#e8f5e8',
      description: 'Light green circle',
    },
    {
      width: '150px',
      height: '100px',
      shape: 'rounded' as const,
      animation: 'pulse' as const,
      backgroundColor: '#fff3e0',
      description: 'Light orange rounded',
    },
  ];
}
