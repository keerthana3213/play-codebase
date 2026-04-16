import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCalendarDemoComponent } from '../app-calendar-demo.component';
import { BasicDemoComponent } from './basic-demo/basic-demo.component';
import { RangeDemoComponent } from './range-demo/range-demo.component';
import { AlwaysOpenDemoComponent } from './always-open-demo/always-open-demo.component';
import { CustomizationDemoComponent } from './customization-demo/customization-demo.component';
import { SurfaceEffectsDemoComponent } from './surface-effects-demo/surface-effects-demo.component';
import { KeyboardNavigationDemoComponent } from './keyboard-navigation-demo/keyboard-navigation-demo.component';
import { AccessibilityDemoComponent } from './accessibility-demo/accessibility-demo.component';
import { FormsIntegrationDemoComponent } from './forms-integration-demo/forms-integration-demo.component';
import { CalendarSizeDemoComponent } from './sizes-demo/calendar-size-demo.component';
import { MinMaxDemoComponent } from './min-max-demo/min-max-demo.component';

const routes: Routes = [
  { path: '', component: AppCalendarDemoComponent },
  { path: 'basic', component: BasicDemoComponent },
  { path: 'range', component: RangeDemoComponent },
  { path: 'always-open', component: AlwaysOpenDemoComponent },
  { path: 'customization', component: CustomizationDemoComponent },
  { path: 'surface-effects', component: SurfaceEffectsDemoComponent },
  { path: 'keyboard-navigation', component: KeyboardNavigationDemoComponent },
  { path: 'accessibility', component: AccessibilityDemoComponent },
  { path: 'forms-integration', component: FormsIntegrationDemoComponent },
  { path: 'size', component: CalendarSizeDemoComponent },
  { path: 'min-max', component: MinMaxDemoComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCalendarDemoComponent,
    BasicDemoComponent,
    RangeDemoComponent,
    AlwaysOpenDemoComponent,
    CustomizationDemoComponent,
    SurfaceEffectsDemoComponent,
    KeyboardNavigationDemoComponent,
    AccessibilityDemoComponent,
    FormsIntegrationDemoComponent,
    CalendarSizeDemoComponent,
    MinMaxDemoComponent
  ]
})
export class CalendarModule {}
