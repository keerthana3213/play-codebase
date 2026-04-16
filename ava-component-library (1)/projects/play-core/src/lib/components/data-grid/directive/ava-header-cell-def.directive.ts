import { Directive, TemplateRef } from "@angular/core";

@Directive({ selector: '[avaHeaderCellDef]' })
export class AvaHeaderCellDefDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}



