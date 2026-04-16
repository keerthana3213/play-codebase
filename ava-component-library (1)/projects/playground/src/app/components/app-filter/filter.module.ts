import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main Filter Component
import { AppFilterComponent } from './app-filter.component';

// Filter Demo Components
import { BasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { SingleGroupDemoComponent } from './demo/single-group-demo/single-group-demo.component';
import { MultiGroupDemoComponent } from './demo/multi-group-demo/multi-group-demo.component';
import { SizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { AdvancedFiltersDemoComponent } from './demo/advanced-filters-demo/advanced-filters-demo.component';
import { ApiDemoComponent } from './demo/api-demo/api-demo.component';

const routes: Routes = [
  { path: '', component: AppFilterComponent },
  { path: 'basic-usage', component: BasicUsageDemoComponent },
  { path: 'single-group', component: SingleGroupDemoComponent },
  { path: 'multi-group', component: MultiGroupDemoComponent },
  { path: 'sizes', component: SizesDemoComponent },
  { path: 'advanced-filters', component: AdvancedFiltersDemoComponent },
  { path: 'api', component: ApiDemoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppFilterComponent,
    BasicUsageDemoComponent,
    SingleGroupDemoComponent,
    MultiGroupDemoComponent,
    SizesDemoComponent,
    AdvancedFiltersDemoComponent,
    ApiDemoComponent,
  ]
})
export class FilterModule { }
