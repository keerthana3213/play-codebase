
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BasicUsageDemoComponent as SearchBarBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { SizesDemoComponent as SearchBarSizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { VariantsDemoComponent as SearchBarVariantsDemoComponent } from './demo/variants-demo/variants-demo.component';
import { IconsDemoComponent as SearchBarIconsDemoComponent } from './demo/icons-demo/icons-demo.component';
import { StatesDemoComponent as SearchBarStatesDemoComponent } from './demo/states-demo/states-demo.component';
import { AppSearchBarComponent } from './app-search-bar.component';
import { VariantsDemo1Component as SearchBarVariantsDemo1Component } from './demo/variants-demo1/variants-demo1.component';
import { SuggestionsDemoComponent as SearchBarSuggestionsDemoComponent } from './demo/suggestions-demo/suggestions-demo.component';




const routes: Routes = [
    { path: '', component: AppSearchBarComponent },
    { path: 'basic-usage', component: SearchBarBasicUsageDemoComponent },
    { path: 'sizes', component: SearchBarSizesDemoComponent },
    { path: 'states', component: SearchBarStatesDemoComponent },
    { path: 'icons', component: SearchBarIconsDemoComponent },
    { path: 'variants1', component: SearchBarVariantsDemoComponent },
    { path: 'variants', component: SearchBarVariantsDemo1Component },
    { path: 'suggestions', component: SearchBarSuggestionsDemoComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppSearchBarComponent,
        SearchBarBasicUsageDemoComponent,
        SearchBarSizesDemoComponent,
        SearchBarStatesDemoComponent,
        SearchBarIconsDemoComponent,
        SearchBarVariantsDemoComponent,
        SearchBarSuggestionsDemoComponent,
    ]
})
export class SearchBarModule { }

