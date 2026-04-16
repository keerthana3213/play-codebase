import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaTextboxComponent } from '@aava/play-core';
import { AavaTooltipDirective } from '@aava/play-core';
@Component({
  selector: 'ava-tooltip-accessibility-demo',
  standalone: true,
  imports: [CommonModule,
    AavaTooltipDirective,
    AavaButtonComponent, AavaTextboxComponent
  ],
  templateUrl: './accessibility-demo.component.html',
  styleUrl: './accessibility-demo.component.scss',
})
export class TooltipAccessibilityDemoComponent {
  highContrastMode = false;
  reduceMotion = false;

  toggleHighContrast(enabled: boolean): void {
    this.highContrastMode = enabled;
  }

  toggleReduceMotion(enabled: boolean): void {
    this.reduceMotion = enabled;
  }

  codeExample = `<!-- Keyboard accessible tooltip -->
<aava-textbox
  label="Username"
  tooltipDescription="Username requirements"
  tooltipTrigger="focus"
  aria-describedby="username-help">
</aava-textbox>

<!-- Button with proper ARIA -->
<button
  tooltipDescription="Save document"
  tooltipTrigger="focus"
  aria-label="Save document"
  aria-describedby="save-tooltip">
  Save
</button>

<!-- Respect motion preferences -->
<aava-button
  tooltipDescription="Motion-aware tooltip"
  [tooltipEnableAnimation]="!reduceMotion">
</aava-button>

<!-- High contrast support -->
<div class="high-contrast-container">
  <aava-button
    tooltipDescription="Adapts to contrast settings"
    tooltipVariant="info">
  </aava-button>
</div>`;
}
