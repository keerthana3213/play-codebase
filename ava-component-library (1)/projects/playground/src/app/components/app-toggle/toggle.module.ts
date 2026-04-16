import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main Toggle Component
import { AppToggleComponent } from './app-toggle.component';

// Toggle Demo Components
import { BasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { SizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { PositionsDemoComponent } from './demo/positions-demo/positions-demo.component';
import { StatesDemoComponent } from './demo/states-demo/states-demo.component';
import { AnimationDemoComponent } from './demo/animation-demo/animation-demo.component';
import { EventsDemoComponent } from './demo/events-demo/events-demo.component';
import { FormsDemoComponent } from './demo/forms-demo/forms-demo.component';
import { AccessibilityDemoComponent } from './demo/accessibility-demo/accessibility-demo.component';
import { IconDemoComponent } from './demo/icon-demo/icon-demo.component';
import { ApiDemoComponent } from './demo/api-demo/api-demo.component';

const routes: Routes = [
  { path: '', component: AppToggleComponent },
  { path: 'basic-usage', component: BasicUsageDemoComponent },
  { path: 'sizes', component: SizesDemoComponent },
  { path: 'positions', component: PositionsDemoComponent },
  { path: 'states', component: StatesDemoComponent },
  { path: 'animation', component: AnimationDemoComponent },
  { path: 'events', component: EventsDemoComponent },
  { path: 'forms', component: FormsDemoComponent },
  { path: 'accessibility', component: AccessibilityDemoComponent },
  { path: 'api', component: ApiDemoComponent },
  { path: 'icon', component: IconDemoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppToggleComponent,
    BasicUsageDemoComponent,
    SizesDemoComponent,
    PositionsDemoComponent,
    StatesDemoComponent,
    AnimationDemoComponent,
    EventsDemoComponent,
    FormsDemoComponent,
    AccessibilityDemoComponent,
    ApiDemoComponent,
    IconDemoComponent,
  ]
})
export class ToggleModule { }
