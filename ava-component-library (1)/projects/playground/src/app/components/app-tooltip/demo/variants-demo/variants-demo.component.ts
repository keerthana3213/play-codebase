import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTooltipDirective } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tooltip-variants-demo',
  standalone: true,
  imports: [CommonModule,
    AavaTooltipDirective,
    AavaButtonComponent
  ],
  templateUrl: './variants-demo.component.html',
  styleUrl: './variants-demo.component.scss',



})
export class TooltipVariantsDemoComponent {
  codeExample = `<!-- Default variant -->
<aava-button
  label="Default"
  aavaTooltipDescription="General information"
  aavaTooltipVariant="default">
</aava-button>`;
}
