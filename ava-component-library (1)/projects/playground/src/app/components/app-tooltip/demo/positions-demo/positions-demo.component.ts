import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTooltipDirective } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tooltip-positions-demo',
  standalone: true,
  imports: [CommonModule, AavaTooltipDirective, AavaButtonComponent],
  templateUrl: './positions-demo.component.html',
  styleUrl: './positions-demo.component.scss',
})
export class TooltipPositionsDemoComponent { }
