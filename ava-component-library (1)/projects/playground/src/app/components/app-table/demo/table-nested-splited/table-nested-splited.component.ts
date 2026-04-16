import { Component } from '@angular/core';
import { AAVA_TABLE_IMPORTS, AavaIconComponent } from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { companyData } from '../../dummy-splited';
@Component({
  selector: 'app-table-nested-splited',
  imports: [CommonModule, AavaIconComponent, ...AAVA_TABLE_IMPORTS],
  templateUrl: './table-nested-splited.component.html',
  styleUrl: './table-nested-splited.component.scss'
})
export class TableNestedSplitedComponent {
displayedColumns = ['companyName', 'location','revenue','expand'];
 dataSource = companyData;

expandedRowIndex = -1;
isExpanded = false;
expandedRowIndex2 = -1;
isExpanded2 = false;

onRowExpand(event:any) {
  console.log('event', event)
  this.expandedRowIndex= event.index;
  this.isExpanded = event.row?false:true;
  if(!this.isExpanded)
  this.isExpanded2 = false;
}

onRowExpand2(event:any) {
  console.log('event', event)
  this.expandedRowIndex2= event.index;
  this.isExpanded2 = event.row?false:true;
}

}
