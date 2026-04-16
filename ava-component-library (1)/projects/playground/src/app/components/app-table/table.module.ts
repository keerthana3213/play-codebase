import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppTableComponent } from './app-table.component';
import { TableBasicUsageComponent } from './demo/1-table-basic-usage/table-basic-usage.component';
import { TableNestedSplitedComponent } from './demo/table-nested-splited/table-nested-splited.component';
import { TableNestedInlineComponent } from './demo/table-nested-inline/table-nested-inline.component';
import { TableNestedInlineCheckboxComponent } from './demo/table-nested-inline-checkbox/table-nested-inline-checkbox.component';

import { TableInfiniteScrollComponent } from './demo/4-table-infinite-scroll/table-infinite-scroll.component';
import { TableActionComponent } from './demo/2-table-action/table-action.component';
import { TableSortingComponent } from './demo/3-table-sorting/table-sorting.component';
import { TableFilterComponent } from './demo/5-table-filter/table-filter.component';


const routes: Routes = [
    { path: '', component: AppTableComponent },
    { path: 'basic-usage', component: TableBasicUsageComponent },
    { path: 'action', component: TableActionComponent },
    { path: 'sorting', component: TableSortingComponent },
    { path: 'filter', component: TableFilterComponent },
    { path: 'infinite-scroll', component: TableInfiniteScrollComponent },
    { path: 'nested-splited', component: TableNestedSplitedComponent },
    { path: 'nested-inline', component: TableNestedInlineComponent },
    { path: 'nested-inline/checkbox', component: TableNestedInlineCheckboxComponent },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppTableComponent,
        TableBasicUsageComponent,

    ]
})
export class TableModule { }
