// aava-header-row.directive.ts
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'tr[aava-header-row]',
  standalone: true
})
export class AavaHeaderRowDirective {
  constructor(public template: TemplateRef<any>) {
   
  }
}
