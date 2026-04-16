import { Directive, Input, ContentChild } from '@angular/core';
import { AavaHeaderCellDefDirective } from './aava-header-cell-def.directive';
import { AavaCellDefDirective } from './aava-cell-def.directive';
@Directive({
  selector: '[aavaColumnDef]',
  standalone: true,
})
export class AavaColumnDefDirective {
  @Input('aavaColumnDef') name!: string;
  @Input() sortable = false;
  @Input() filterable = false;

  @ContentChild(AavaHeaderCellDefDirective)
  headerCellDef?: AavaHeaderCellDefDirective;

  @ContentChild(AavaCellDefDirective)
  cellDef?: AavaCellDefDirective;
}
