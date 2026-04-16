import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaTooltipDirective } from '@aava/play-core';

@Component({
  selector: 'ava-tooltip-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaTooltipDirective, AavaButtonComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrl: './sizes-demo.component.scss',
})
export class TooltipSizesDemoComponent { }
