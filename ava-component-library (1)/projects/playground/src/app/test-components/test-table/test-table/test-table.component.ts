import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AavaHeaderRowDefDirective, AavaHeaderRowDirective, AavaTableComponent } from '../../../../../../play-core/src/public-api';
import { AavaColumnDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-column-def.directive';
import { AavaHeaderCellDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-header-cell-def.directive';
import { AavaCellDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-cell-def.directive';
import { AavaRowDefDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-row-def.directive';
import { AavaRowDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-row.directive';
import { AavaRowDetailDirective } from '../../../../../../play-core/src/lib/components/table/directives/aava-row-detail.directive';
import { AavaCheckboxComponent, AavaIconComponent } from '@aava/play-core';
@Component({
  selector: 'app-test-table',
  imports: [CommonModule, 
    AavaCheckboxComponent,
    AavaIconComponent,
    AavaTableComponent, AavaHeaderRowDefDirective, AavaHeaderRowDirective,
    AavaColumnDefDirective, AavaHeaderCellDefDirective, AavaCellDefDirective,AavaRowDefDirective,
    AavaRowDirective, AavaRowDetailDirective
  ],
  templateUrl: './test-table.component.html',
  styleUrl: './test-table.component.scss'
})
export class TestTableComponent {
  displayedColumns = ['name', 'owner'];
  dataSource  = [
  {
    name: 'Library Redesign',
    owner: 'Ashok',
    tasks: [
      { name: 'Set up CI/CD', owner:'own1' },
      
      { name: 'Implement new ' , owner:'own2'}
    ]
  },
  {
    name: 'Data Table Refactor',
    owner: 'Sai',
    tasks: [
      { name: 'Fix column resizing' },
      { name: 'Add virtual scroll' }
    ]
  }
];

expandedRowIndex = -1;
isExpanded = false;

onRowExpand(event:any) {
  this.expandedRowIndex= event.index;
  this.isExpanded = event.row?false:true;
}




}
