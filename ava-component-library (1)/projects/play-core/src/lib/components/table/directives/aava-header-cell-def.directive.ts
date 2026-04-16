import { ContentChild, Directive, TemplateRef } from '@angular/core';
@Directive({
  selector: '[aavaHeaderCellDef]',
  standalone: true,
})
export class AavaHeaderCellDefDirective {
  constructor(public template: TemplateRef<any>) {}
}
