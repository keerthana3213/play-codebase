import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AavaButtonComponent, AavaIconComponent } from '@aava/play-core';

import { AavaHeaderRowDefDirective, AavaHeaderRowDirective, AavaTableComponent } from '../../../../../../play-core/src/public-api';
import { AavaColumnDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-column-def.directive';
import { AavaHeaderCellDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-header-cell-def.directive';
import { AavaCellDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-cell-def.directive';
import { AavaRowDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-row-def.directive';
import { AavaRowDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-row.directive';
import { AavaRowDetailDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-row-detail.directive';
import { dummyUserData } from '../dummy-data';


@Component({
  selector: 'app-nested-with-different-columns',
  imports: [CommonModule, AavaIconComponent,
    
    
    AavaTableComponent, AavaHeaderRowDefDirective, AavaHeaderRowDirective,
    AavaColumnDefDirective, AavaHeaderCellDefDirective, AavaCellDefDirective,AavaRowDefDirective,
    AavaRowDirective, AavaRowDetailDirective],
  templateUrl: './nested-with-different-columns.component.html',
  styleUrl: './nested-with-different-columns.component.scss'
})
export class NestedWithDifferentColumnsComponent {
 displayedColumns = ['name', 'email','role','status'];
 dataSource = dummyUserData;

expandedRowIndex = -1;
isExpanded = false;

onRowExpand(event:any) {
  this.expandedRowIndex= event.index;
  this.isExpanded = event.row?false:true;
}

}
