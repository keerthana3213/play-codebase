import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main File Upload Component
import { AppFileUploadDemoComponent } from './app-fileupload-demo.component';

// File Upload Demo Components
import { BasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { LayoutVariantsDemoComponent } from './demo/layout-variants-demo/layout-variants-demo.component';
import { SizeVariantsDemoComponent } from './demo/size-variants-demo/size-variants-demo.component';
import { ValidationDemoComponent } from './demo/validation-demo/validation-demo.component';
import { SingleMultipleDemoComponent } from './demo/single-multiple-demo/single-multiple-demo.component';
import { StatesDemoComponent } from './demo/states-demo/states-demo.component';
import { ApiDemoComponent } from './demo/api-demo/api-demo.component';
import { PreviewLayoutDemoComponent } from './demo/preview-layout-demo/preview-layout-demo.component';
import { AdvancedFeaturesDemoComponent } from './demo/advanced-features-demo/advanced-features-demo.component';
import { IconCustomizationDemoComponent } from './demo/icon-customization-demo/icon-customization-demo.component';

const routes: Routes = [
  { path: '', component: AppFileUploadDemoComponent },
  { path: 'basic-usage', component: BasicUsageDemoComponent },
  { path: 'layout-variants', component: LayoutVariantsDemoComponent },
  { path: 'size-variants', component: SizeVariantsDemoComponent },
  { path: 'validation', component: ValidationDemoComponent },
  { path: 'single-multiple', component: SingleMultipleDemoComponent },
  { path: 'states', component: StatesDemoComponent },
  { path: 'preview-layout', component: PreviewLayoutDemoComponent },
  { path: 'advanced-features', component: AdvancedFeaturesDemoComponent },
  { path: 'icon-customization', component: IconCustomizationDemoComponent },
  { path: 'api', component: ApiDemoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppFileUploadDemoComponent,
    BasicUsageDemoComponent,
    LayoutVariantsDemoComponent,
    SizeVariantsDemoComponent,
    ValidationDemoComponent,
    SingleMultipleDemoComponent,
    StatesDemoComponent,
    PreviewLayoutDemoComponent,
    AdvancedFeaturesDemoComponent,
    IconCustomizationDemoComponent,
    ApiDemoComponent,
  ]
})
export class FileUploadModule { }
