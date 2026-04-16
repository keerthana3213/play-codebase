import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[avaCellDef]'
})
export class AvaCellDefDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
