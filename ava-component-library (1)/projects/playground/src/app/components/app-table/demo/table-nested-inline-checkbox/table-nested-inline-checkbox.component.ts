import { Component } from '@angular/core';

import { EMPLOYEE_DATA } from '../../dummy-employee';
import  {AavaCheckboxComponent, AavaIconComponent } from '@aava/play-core';
import { AAVA_TABLE_IMPORTS } from '../../../../../../../play-core/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-nested-inline-checkbox',
  imports: [ CommonModule,AavaIconComponent,AavaCheckboxComponent,...AAVA_TABLE_IMPORTS],
  templateUrl: './table-nested-inline-checkbox.component.html',
  styleUrl: './table-nested-inline-checkbox.component.scss'
})
export class TableNestedInlineCheckboxComponent {
  displayedColumns = ['expand', 'name', 'department', 'position', 'salary'];
  selectdisplayedColumns = ['expand', 'select', 'name', 'department', 'position', 'salary'];
  dataSource = EMPLOYEE_DATA;

  expandedRowIndex = -1;
  isExpanded = false;

  expandedRowIndex2 = -1;
  isExpanded2 = false;

  onRowExpand(event: any) {
    this.expandedRowIndex = event.index;
    this.isExpanded = event.row ? false : true;
  }

  rowExpandLevel2() {
    this.isExpanded2 = !this.isExpanded2;
  }
}
