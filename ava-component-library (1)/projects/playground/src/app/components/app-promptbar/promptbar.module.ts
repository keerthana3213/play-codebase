import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main Prompt Bar Component
import { AppPromptbarComponent } from './app-promptbar.component';

// Prompt Bar Demo Components
import { BasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { SizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { IconsDemoComponent } from './demo/icons-demo/icons-demo.component';
import { FileUploadDemoComponent } from './demo/file-upload-demo/file-upload-demo.component';
import { StatesDemoComponent } from './demo/states-demo/states-demo.component';

import { ApiDemoComponent } from './demo/api-demo/api-demo.component';

const routes: Routes = [
  { path: '', component: AppPromptbarComponent },
  { path: 'basic-usage', component: BasicUsageDemoComponent },
  { path: 'sizes', component: SizesDemoComponent },
  { path: 'icons', component: IconsDemoComponent },
  { path: 'file-upload', component: FileUploadDemoComponent },
  { path: 'states', component: StatesDemoComponent },

  { path: 'api', component: ApiDemoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppPromptbarComponent,
    BasicUsageDemoComponent,
    SizesDemoComponent,
    IconsDemoComponent,
    FileUploadDemoComponent,
    StatesDemoComponent,

    ApiDemoComponent,
  ]
})
export class PromptbarModule { }
