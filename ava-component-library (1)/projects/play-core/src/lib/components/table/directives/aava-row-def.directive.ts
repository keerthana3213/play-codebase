import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[aavaRowDef]',
  standalone: true
})
export class AavaRowDefDirective {
  @Input('aavaRowDefColumns') columns: string[] = [];
}
