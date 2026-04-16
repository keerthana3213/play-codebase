import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAutocompleteComponent } from './app-autocomplete.component';
import {
    AppAutocompleteBasicUsageDemoComponent,
    AppAutocompleteMultiSelectDemoComponent,
    AppAutocompleteIconsDemoComponent,
    AppAutocompleteLoadingDemoComponent,
    AppAutocompleteTemplatesDemoComponent,
    AppAutocompleteFormsDemoComponent,
    AppAutocompleteAccessibilityDemoComponent,
    AppAutocompleteAsyncDemoComponent,
    AppAutocompleteCustomStylesDemoComponent,
} from './demo';

const routes: Routes = [
    { path: '', component: AppAutocompleteComponent },
    { path: 'basic-usage', component: AppAutocompleteBasicUsageDemoComponent },
    { path: 'multi-select', component: AppAutocompleteMultiSelectDemoComponent },
    { path: 'icons', component: AppAutocompleteIconsDemoComponent },
    { path: 'loading', component: AppAutocompleteLoadingDemoComponent },
    { path: 'templates', component: AppAutocompleteTemplatesDemoComponent },
    { path: 'forms', component: AppAutocompleteFormsDemoComponent },
    { path: 'accessibility', component: AppAutocompleteAccessibilityDemoComponent },
    { path: 'async', component: AppAutocompleteAsyncDemoComponent },
    { path: 'custom-styles', component: AppAutocompleteCustomStylesDemoComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppAutocompleteComponent,
        AppAutocompleteBasicUsageDemoComponent,
        AppAutocompleteMultiSelectDemoComponent,
        AppAutocompleteIconsDemoComponent,
        AppAutocompleteLoadingDemoComponent,
        AppAutocompleteTemplatesDemoComponent,
        AppAutocompleteFormsDemoComponent,
        AppAutocompleteAccessibilityDemoComponent,
        AppAutocompleteAsyncDemoComponent,
        AppAutocompleteCustomStylesDemoComponent,
    ],
})
export class AutocompleteModule { }
