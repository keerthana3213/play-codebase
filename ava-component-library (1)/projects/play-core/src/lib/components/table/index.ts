
import { AavaTableComponent, type AavaSortEvent } from './aava-table.component';
import { AavaColumnDefDirective } from './directives/aava-column-def.directive';
import { AavaHeaderCellDefDirective } from './directives/aava-header-cell-def.directive';
import { AavaCellDefDirective } from './directives/aava-cell-def.directive';
import { AavaHeaderRowDefDirective } from './directives/aava-header-row-def.directive';
import { AavaHeaderRowDirective } from './directives/aava-header-row.directive';
import { AavaRowDefDirective } from './directives/aava-row-def.directive';
import { AavaRowDirective } from './directives/aava-row.directive';
import { AavaRowDetailDirective } from './directives/aava-row-detail.directive';
import { AavaNoDataRowDirective } from './directives/aava-no-data-row.directive';

export const AAVA_TABLE_IMPORTS = [
  AavaTableComponent,
  AavaColumnDefDirective,
  AavaHeaderCellDefDirective,
  AavaCellDefDirective,
  AavaHeaderRowDirective,
  AavaHeaderRowDefDirective,
  AavaRowDirective,
  AavaRowDefDirective,
  AavaRowDetailDirective,
  AavaNoDataRowDirective,
] as const;
export {
  AavaTableComponent,
  AavaSortEvent,
  AavaColumnDefDirective,
  AavaHeaderCellDefDirective,
  AavaCellDefDirective,
  AavaHeaderRowDefDirective,
  AavaHeaderRowDirective,
  AavaRowDefDirective,
  AavaRowDirective,
  AavaRowDetailDirective,
  AavaNoDataRowDirective,
};
