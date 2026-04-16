import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaSpinnerComponent,
  SpinnerSize,
} from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaSpinnerComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrls: ['./sizes-demo.component.scss'],
})
export class SizesDemoComponent {
  spinnerSizes: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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
import { SpinnerComponent, SpinnerSize } from '../../../../../../../@aava/play-core/src/lib/components/spinner/spinner.component';

@Component({
  selector: 'app-spinner-sizes',
  standalone: true,
  imports: [SpinnerComponent],
  template: \`
    <div class="spinner-sizes-demo">
      <div class="size-row">
        <div class="size-item" *ngFor="let size of spinnerSizes">
          <aava-spinner type="linear-gradient" color="primary" [size]="size" [animation]="true"></aava-spinner>
          <span class="size-label">{{ size | uppercase }}</span>
        </div>
      </div>
    </div>
  \`
})
export class SpinnerSizesComponent {
  spinnerSizes: SpinnerSize[] = ['sm', 'md', 'lg', 'xl'];
}`;
  }
}
