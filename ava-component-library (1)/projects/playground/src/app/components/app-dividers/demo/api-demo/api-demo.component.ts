import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApiDemoComponent {
  // Component Properties
  apiProps: ApiProperty[] = [
    {
      name: 'variant',
      type: "'solid' | 'dashed' | 'dotted' | 'gradient'",
      default: "'solid'",
      description:
        'Visual style variant of the divider. Solid for clear separation, dashed for subtle breaks, dotted for delicate divisions, gradient for modern aesthetics.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description:
        'Layout orientation of the divider. Horizontal spans full width for content sections, vertical spans full height for sidebar separations.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'#000000'",
      description:
        'Custom color for solid, dashed, and dotted variants. Accepts hex, RGB, HSL values, or CSS custom properties.',
    },
  ];

  // CSS Custom Properties
  cssProps: ApiProperty[] = [
    {
      name: '--divider-color',
      type: 'string',
      default: 'inherited from color input',
      description: 'Color for solid, dashed, and dotted variants',
    },
    {
      name: '--divider-background-gradient',
      type: 'string',
      default: 'linear-gradient(90deg, transparent, #000, transparent)',
      description: 'Gradient background for gradient variant',
    },
    {
      name: '--divider-opacity',
      type: 'number',
      default: '1',
      description: 'Opacity for all divider variants',
    },
    {
      name: '--divider-thickness',
      type: 'string',
      default: '1px',
      description: 'Thickness of the divider line',
    },
    {
      name: '--divider-spacing',
      type: 'string',
      default: '10px',
      description: 'Padding around divider element',
    },
  ];

  copyCode(): void {
    const code = `import { DividersComponent } from '@ava/@aava/play-core';`;
    navigator.clipboard.writeText(code);
  }
}
