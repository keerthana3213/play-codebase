import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main Select Component
import { AppSelectComponent } from './app-select.component';

// Select Demo Components
import { BasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { MultipleSelectionDemoComponent } from './demo/multiple-selection-demo/multiple-selection-demo.component';
import { FormIntegrationDemoComponent } from './demo/form-integration-demo/form-integration-demo.component';
import { IconsDemoComponent } from './demo/icons-demo/icons-demo.component';
import { StatesDemoComponent } from './demo/states-demo/states-demo.component';
import { SizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { SearchDemoComponent } from './demo/search-demo/search-demo.component';
import { ApiDemoComponent } from './demo/api-demo/api-demo.component';

const routes: Routes = [
  { path: '', component: AppSelectComponent },
  { path: 'basic-usage', component: BasicUsageDemoComponent },
  { path: 'form-integration', component: FormIntegrationDemoComponent },
  { path: 'multiple-selection', component: MultipleSelectionDemoComponent },
  { path: 'icons', component: IconsDemoComponent },
  { path: 'states', component: StatesDemoComponent },
  { path: 'sizes', component: SizesDemoComponent },
  { path: 'search', component: SearchDemoComponent },
  { path: 'api', component: ApiDemoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppSelectComponent,
    BasicUsageDemoComponent,
    MultipleSelectionDemoComponent,
    FormIntegrationDemoComponent,
    IconsDemoComponent,
    StatesDemoComponent,
    SizesDemoComponent,
    SearchDemoComponent,
    ApiDemoComponent,
  ]
})
export class SelectModule { }
