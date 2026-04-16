import { Component, ElementRef, ViewChild } from '@angular/core';
import { DUMMY_USERS } from '../../dummy-data';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';
import { AAVA_TABLE_IMPORTS } from '@aava/play-core';

 //import { AAVA_TABLE_IMPORTS } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'app-table-infinite-scroll',
  imports: [CommonModule, AavaTagComponent, ...AAVA_TABLE_IMPORTS],
  templateUrl: './table-infinite-scroll.component.html',
  styleUrl: './table-infinite-scroll.component.scss'
})
export class TableInfiniteScrollComponent {

@ViewChild('tableContainer') tableContainer!: ElementRef<HTMLElement>;
private lastScrollTop = 0;
  displayedColumns = ['name', 'email', 'realm', 'status'];
  dataSource = DUMMY_USERS;
  loading = false;
  infiniteScrollLoading = false;
  alreadyLoading = true;
  getStatusColor(status: string) {
    switch (status) {
      case 'Active':
        return {
          background: 'var(--success-bg, #E8F5E9)',
          color: 'var(--success-text, #2E7D32)',
          border: '1px solid var(--success-border, #A5D6A7)',
          'margin-right': '5px',
        };

      case 'Pending':
        return {
          background: 'var(--warning-bg, #FFF8E1)',
          color: 'var(--warning-text, #F57C00)',
          border: '1px solid var(--warning-border, #FFE082)',
          'margin-right': '5px',
        };

      case 'Verified':
        return {
          background: 'var(--info-bg, #E3F2FD)',
          color: 'var(--info-text, #1976D2)',
          border: '1px solid var(--info-border, #90CAF9)',
          'margin-right': '5px',

        };

      case 'Inactive':
        return {
          background: 'var(--error-bg, #FFEBEE)',
          color: 'var(--error-text, #C62828)',
          border: '1px solid var(--error-border, #EF9A9A)',
          'margin-right': '5px',
        };

      default:
        return {
          background: 'var(--primary-bg, #E8EAF6)',
          color: 'var(--primary-text, #3F51B5)',
          border: '1px solid var(--primary-border, #C5CAE9)',
          'margin-right': '5px',
        };
    }
  }
fetchNextPage() {
 
  if(!this.infiniteScrollLoading)  {
     console.log('loadMore');
    this.infiniteScrollLoading = true;
  setTimeout(() => {
     this.infiniteScrollLoading = false;
     this.dataSource = [...this.dataSource, ...DUMMY_USERS];
  },3000);
  }
  
}

}



