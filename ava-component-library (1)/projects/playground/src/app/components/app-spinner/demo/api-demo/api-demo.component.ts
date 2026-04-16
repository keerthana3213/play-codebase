import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSpinnerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule, AavaSpinnerComponent],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss'],
})
export class ApiDemoComponent {
  apiProps = [
    {
      name: 'type',
      type: "'linear-gradient' | 'blob'",
      default: "'linear-gradient'",
      description: 'Visual style of the spinner',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: 'Size of the spinner',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | string",
      default: "'primary'",
      description: 'Color variant of the spinner',
    },
    {
      name: 'animation',
      type: 'boolean',
      default: 'false',
      description: 'Whether to animate the spinner',
    },
    {
      name: 'progressIndex',
      type: 'number',
      default: '25',
      description: 'Progress value for determinate loading (0-100)',
    },
  ];

  copyToClipboard(): void {
    const code = this.getExampleCode();
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }

  getExampleCode(): string {
    return `import { Component } from '@angular/core';
import { AavaSpinnerComponent } from '../../../../../../../@aava/play-core/src/lib/components/spinner/aava-spinner.component';

@Component({
  selector: 'app-spinner-api',
  standalone: true,
  imports: [AavaSpinnerComponent],
  template: \`
    <!-- Basic usage -->
    <aava-spinner type="linear-gradient" size="md" color="primary"></aava-spinner>
    
    <!-- With progress -->
    <aava-spinner type="linear-gradient" [progressIndex]="75" color="success"></aava-spinner>
    
    <!-- Without animation -->
    <aava-spinner type="blob" [animation]="false" color="warning"></aava-spinner>
    
    <!-- Custom class -->
    <aava-spinner type="linear-gradient" className="custom-spinner" color="primary"></aava-spinner>
  \`
})
export class SpinnerApiComponent { }`;
  }
}
