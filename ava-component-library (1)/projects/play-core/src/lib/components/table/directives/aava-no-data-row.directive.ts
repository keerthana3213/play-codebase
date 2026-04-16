import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[aavaNoDataRow]',
    standalone: true
})
export class AavaNoDataRowDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
