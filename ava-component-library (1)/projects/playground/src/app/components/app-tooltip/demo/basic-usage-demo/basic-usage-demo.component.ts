import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTooltipDirective } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tooltip-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaTooltipDirective, AavaButtonComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class TooltipBasicUsageDemoComponent { }
