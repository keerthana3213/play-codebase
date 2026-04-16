import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aavaCellDef]',
  standalone: true,
})
export class AavaCellDefDirective {
  constructor(public template: TemplateRef<any>) {}
}
