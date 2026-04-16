import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aavaRowDetail]',
  standalone: true
})
export class AavaRowDetailDirective {
  constructor(public template: TemplateRef<any>) {}
}
