import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSpinnerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-colors-demo',
  standalone: true,
  imports: [CommonModule, AavaSpinnerComponent],
  templateUrl: './colors-demo.component.html',
  styleUrls: ['./colors-demo.component.scss'],
})
export class ColorsDemoComponent {
  spinnerColors: {
    name: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    description: string;
  }[] = [
      { name: 'primary', description: 'Default brand color' },
      { name: 'secondary', description: 'Secondary brand color' },
      { name: 'success', description: 'Success state indication' },
      { name: 'warning', description: 'Warning state indication' },
      { name: 'danger', description: 'Error or critical state indication' },
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
  selector: 'app-spinner-colors',
  standalone: true,
  imports: [AavaSpinnerComponent],
  template: \`
    <div class="spinner-colors-demo">
      <div class="color-grid">
        <div class="color-item" *ngFor="let color of spinnerColors">
          <aava-spinner type="linear-gradient" [color]="color.name" size="md" [animation]="true"></aava-spinner>
          <span class="color-label">{{ color.name | titlecase }}</span>
        </div>
      </div>
    </div>
  \`
})
export class SpinnerColorsComponent {
  spinnerColors = [
    { name: 'primary', description: 'Default brand color' },
    { name: 'secondary', description: 'Secondary brand color' },
    { name: 'success', description: 'Success state indication' },
    { name: 'warning', description: 'Warning state indication' },
    { name: 'danger', description: 'Error or critical state indication' },
  ];
}`;
  }
}
