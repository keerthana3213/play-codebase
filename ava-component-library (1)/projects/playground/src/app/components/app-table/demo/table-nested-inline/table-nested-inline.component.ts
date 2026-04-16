import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {AavaIconComponent } from '@aava/play-core';
import { EMPLOYEE_DATA } from '../../dummy-employee';
import { AAVA_TABLE_IMPORTS } from '../../../../../../../play-core/src/public-api';



@Component({
  selector: 'app-table-nested-inline',
  imports: [ CommonModule,AavaIconComponent,...AAVA_TABLE_IMPORTS],
  templateUrl: './table-nested-inline.component.html',
  styleUrl: './table-nested-inline.component.scss'
})
export class TableNestedInlineComponent {
  displayedColumns = ['expand','name', 'department','position','salary'];
  selectdisplayedColumns = ['expand','select','name', 'department','position','salary'];
  dataSource = EMPLOYEE_DATA;
  
  expandedRowIndex = -1;
  isExpanded = false;

  expandedRowIndex2 = -1;
  isExpanded2= false;
  
  onRowExpand(event:any) {
    this.expandedRowIndex= event.index;
    this.isExpanded = event.row?false:true;
  }

  rowExpandLevel2(){
    this.isExpanded2 = !this.isExpanded2;
  }



}
