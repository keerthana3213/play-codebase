
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[aavaHeaderRowDef]',
  standalone: true
})
export class AavaHeaderRowDefDirective {
  @Input('aavaHeaderRowDef') columns: string[] = [];
  
}
