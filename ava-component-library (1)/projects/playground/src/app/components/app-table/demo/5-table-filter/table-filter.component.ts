import { Component, OnInit } from '@angular/core';
import { DUMMY_USERS } from '../../dummy-data';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';
//import { AAVA_TABLE_IMPORTS } from '@aava/play-core';


 import { AAVA_TABLE_IMPORTS } from '../../../../../../../play-core/src/public-api';



@Component({
  selector: 'app-table-filter',
  imports: [ CommonModule,AavaTagComponent,...AAVA_TABLE_IMPORTS],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss'
})
export class TableFilterComponent implements OnInit {
 displayedColumns = ['name', 'email','realm','status'];
 dataSource = DUMMY_USERS;
 loading = true;
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

ngOnInit(): void {
  setTimeout(() => {
    this.loading = false;
  }, 500); 
}


onFilterChange(filter: any): void {
  console.log('Filter:', filter);
  this.loading = true;
  const filterData = DUMMY_USERS.filter((item: any) => {
    return filter.every((f: any) => {
      // Retrieve the value from the item, defaulting to an empty string
      const cellValue = (item[f.column]?.toString() ?? '').toLowerCase(); // Handle undefined columns
      const val = (f.value ?? '').toLowerCase(); // Make sure the filter value is a string

      switch (f.operator) {
        case 'Starts With':
          return cellValue.startsWith(val);
        case 'Ends With':
          return cellValue.endsWith(val);
        case 'Contains':
          return cellValue.includes(val);
        case 'Equal':
          return cellValue === val;
        case 'Empty':
          return cellValue === '';
        case 'Does Not Start With':
          return !cellValue.startsWith(val);
        case 'Does Not End With':
          return !cellValue.endsWith(val);
        case 'Does Not Contain':
          return !cellValue.includes(val);
        case 'Not Equal':
          return cellValue !== val;
        case 'Not Empty':
          return cellValue !== '';
        default:
          return true; // This case is a fallback to always return true (no filter applied)
      }
    });
  });

  // Check if the filtered data has changed before updating
  console.log('Filtered Data:', filterData);
  setTimeout(() => {
    if(filter.length > 0 ) {
     this.dataSource = [...filterData]; 
    } else {
      this.dataSource = [... DUMMY_USERS];
    }
    this.loading = false;
  }, 1000);
 
}


}
