import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppTooltipComponent } from './app-tooltip.component';
import { TooltipAccessibilityDemoComponent } from './demo/accessibility-demo/accessibility-demo.component';
import { TooltipVariantsDemoComponent } from './demo/variants-demo/variants-demo.component';
import { TooltipAnimationDemoComponent } from './demo/animation-demo/animation-demo.component';
import { TooltipBehaviorsDemoComponent } from './demo/behaviors-demo/behaviors-demo.component';
import { TooltipSizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { TooltipPositionsDemoComponent } from './demo/positions-demo/positions-demo.component';
import { TooltipBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';

const routes: Routes = [
    { path: '', component: AppTooltipComponent },
    { path: 'basic-usage', component: TooltipBasicUsageDemoComponent },
    { path: 'positions', component: TooltipPositionsDemoComponent },
    { path: 'sizes', component: TooltipSizesDemoComponent },
    { path: 'animation', component: TooltipAnimationDemoComponent },
    { path: 'behaviors', component: TooltipBehaviorsDemoComponent },
    { path: 'variants', component: TooltipVariantsDemoComponent },
    { path: 'accessibility', component: TooltipAccessibilityDemoComponent, },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppTooltipComponent,
        TooltipBasicUsageDemoComponent,
        TooltipPositionsDemoComponent,
        TooltipSizesDemoComponent,
        TooltipAnimationDemoComponent,
        TooltipBehaviorsDemoComponent,
        TooltipVariantsDemoComponent
    ]
})
export class TooltipModule { }
