import { Component } from '@angular/core';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaTooltipDirective } from '@aava/play-core';

@Component({
  selector: 'app-test-tooltip',
  standalone: true,
  imports: [AavaButtonComponent, AavaTooltipDirective],
  templateUrl: './test-tooltip.component.html',
  styleUrl: './test-tooltip.component.scss'
})
export class TestTooltipComponent {

}
