import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AavaSpinnerComponent,
    SpinnerType,
} from '../../../../../../../play-core/src/public-api';

@Component({
    selector: 'ava-types-demo',
    standalone: true,
    imports: [CommonModule, AavaSpinnerComponent],
    templateUrl: './types-demo.component.html',
    styleUrls: ['./types-demo.component.scss'],
})
export class TypesDemoComponent {
    spinnerTypes: SpinnerType[] = ['linear-gradient', 'blob'];

    typeDescriptions: Record<string, string> = {
        'linear-gradient': 'A smooth gradient spinner suitable for most use cases.',
        blob: 'A modern, distinctive blob-style spinner for unique interfaces.',
    };

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
import { AavaSpinnerComponent, SpinnerType } from '@aava/play-core';

@Component({
  selector: 'app-spinner-types',
  standalone: true,
  imports: [AavaSpinnerComponent],
  template: \`
    <div class="spinner-types-demo">
      <div class="spinner-grid">
        <div class="spinner-item" *ngFor="let type of spinnerTypes">
          <aava-spinner [type]="type" color="primary" size="md" [animation]="true"></aava-spinner>
          <span class="type-label">{{ type | titlecase }}</span>
        </div>
      </div>
    </div>
  \`
})
export class SpinnerTypesComponent {
  spinnerTypes: SpinnerType[] = ['linear-gradient', 'blob'];
}`;
    }
}
