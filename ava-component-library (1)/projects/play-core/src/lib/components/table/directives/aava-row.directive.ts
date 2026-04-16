import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'tr[aava-row]',
  standalone: true
})
export class AavaRowDirective {
  constructor(public template: TemplateRef<any>) {}
}
