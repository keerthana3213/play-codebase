import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTooltipDirective } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tooltip-behaviors-demo',
  standalone: true,
  imports: [CommonModule, AavaTooltipDirective, AavaButtonComponent],
  templateUrl: './behaviors-demo.component.html',
  styleUrl: './behaviors-demo.component.scss',

})
export class TooltipBehaviorsDemoComponent {
  showTooltipInfo(): void {
    console.log('Show tooltip info');
  }

  hideTooltipInfo(): void {
    console.log('Hide tooltip info');
  }

  codeExample = `<!-- Hover trigger (default) -->
<aava-button
  label="Hover"
  tooltipDescription="Appears on hover"
  tooltipTrigger="hover">
</aava-button>

<!-- Click trigger -->
<aava-button
  label="Click"
  tooltipDescription="Appears on click"
  tooltipTrigger="click">
</aava-button>

<!-- Focus trigger -->
<input
  tooltipDescription="Appears on focus"
  tooltipTrigger="focus">

<!-- Programmatic control -->
<aava-button
  label="Controlled"
  tooltipDescription="Controlled programmatically">
</aava-button>`;
}
