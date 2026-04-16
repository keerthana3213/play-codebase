import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main Timepicker Component
import { AppTimepickerComponent } from './app-timepicker.component';

// Timepicker Demo Components
import { BasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { ScrollModeDemoComponent } from './demo/scroll-mode-demo/scroll-mode-demo.component';
import { KeyboardNavigationDemoComponent } from './demo/keyboard-navigation-demo/keyboard-navigation-demo.component';
import { ValidationDemoComponent } from './demo/validation-demo/validation-demo.component';
import { CustomStylingDemoComponent } from './demo/custom-styling-demo/custom-styling-demo.component';
import { SizeVariantComponent } from './demo/size-variant/size-variant.component';

const routes: Routes = [
  { path: '', component: AppTimepickerComponent },
  { path: 'basic-usage', component: BasicUsageDemoComponent },
  { path: 'scroll-mode', component: ScrollModeDemoComponent },
  { path: 'keyboard-navigation', component: KeyboardNavigationDemoComponent },
  { path: 'validation', component: ValidationDemoComponent },
  { path: 'custom-styling', component: CustomStylingDemoComponent },
  { path: 'sizes', component: SizeVariantComponent },
  { path: 'api', component: ValidationDemoComponent }, // Reuse validation for API demo
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTimepickerComponent,
    BasicUsageDemoComponent,
    ScrollModeDemoComponent,
    KeyboardNavigationDemoComponent,
    ValidationDemoComponent,
    CustomStylingDemoComponent,
    SizeVariantComponent,
  ]
})
export class TimepickerModule { }
