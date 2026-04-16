import { Component, OnInit } from '@angular/core';
import { DUMMY_USERS } from '../../dummy-data';
import { CommonModule } from '@angular/common';

import { AavaTagComponent } from '@aava/play-core';
//import { AAVA_TABLE_IMPORTS } from '@aava/play-core';

import { AAVA_TABLE_IMPORTS } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'app-table-sorting',
   imports: [ CommonModule,AavaTagComponent,...AAVA_TABLE_IMPORTS],
  templateUrl: './table-sorting.component.html',
  styleUrl: './table-sorting.component.scss'
})
export class TableSortingComponent implements OnInit{
 displayedColumns = ['name', 'email','realm','status'];
 dataSource = DUMMY_USERS;
 loading = true;
 ngOnInit(): void {
  setTimeout(() => {
    this.loading = false;
  }, 2000); 
 }
 getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return {
        background: 'var(--success-bg, #E8F5E9)',
        color: 'var(--success-text, #2E7D32)',
        border: '1px solid var(--success-border, #A5D6A7)',
        'margin-right':'5px',
      };

    case 'Pending':
      return {
        background: 'var(--warning-bg, #FFF8E1)',
        color: 'var(--warning-text, #F57C00)',
        border: '1px solid var(--warning-border, #FFE082)',
        'margin-right':'5px',
      };

    case 'Verified':
      return {
        background: 'var(--info-bg, #E3F2FD)',
        color: 'var(--info-text, #1976D2)',
        border: '1px solid var(--info-border, #90CAF9)',
        'margin-right':'5px',
        
      };

    case 'Inactive':
      return {
        background: 'var(--error-bg, #FFEBEE)',
        color: 'var(--error-text, #C62828)',
        border: '1px solid var(--error-border, #EF9A9A)',
        'margin-right':'5px',
      };

    default:
      return {
        background: 'var(--primary-bg, #E8EAF6)',
        color: 'var(--primary-text, #3F51B5)',
        border: '1px solid var(--primary-border, #C5CAE9)',
        'margin-right':'5px',
      };
  }
}

onSortChange(event:any) {
  console.log('sortEvent:',event);
  this.loading= true;
  const col = event.column;
  const sortDirection = event.direction;
  setTimeout(() => {
    //Sorting logic
     const dataSource = [... this.dataSource].sort((a:any, b:any) => {
        const valA = (a[col] || '').toString().toLowerCase();
        const valB = (b[col] || '').toString().toLowerCase();
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      this.dataSource = dataSource;
      this.loading = false;
  }, 500);
}


}
