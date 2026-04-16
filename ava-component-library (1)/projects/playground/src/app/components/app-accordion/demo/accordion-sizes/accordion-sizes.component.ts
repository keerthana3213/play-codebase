import { Component } from '@angular/core';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'app-accordion-sizes',
  imports: [AavaAccordionComponent],
  templateUrl: './accordion-sizes.component.html',
  styleUrl: './accordion-sizes.component.scss',
})
export class AccordionSizesComponent {
  onAccordionToggle(event: any): void {
    console.log('Accordion toggled:', event);
  }
}
