import { ContentChild, Directive, Input } from '@angular/core';
import { AvaHeaderCellDefDirective } from './ava-header-cell-def.directive';
import { AvaCellDefDirective } from './ava-cell-def.directive';


@Directive({
  selector: '[avaColumnDef]'
})
export class AvaColumnDefDirective {
  @Input('avaColumnDef') name!: string;
  @Input() sortable: boolean = false;
  @Input() filter: boolean = false;


  @ContentChild(AvaHeaderCellDefDirective) headerCellDef?: AvaHeaderCellDefDirective;
  @ContentChild(AvaCellDefDirective) cellDef?: AvaCellDefDirective;
}
