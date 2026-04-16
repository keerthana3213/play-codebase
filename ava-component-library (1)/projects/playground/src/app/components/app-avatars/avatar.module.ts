import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAvatarsComponent } from './app-avatars.component';
import { BasicDemoComponent as AvatarBasicDemoComponent } from './demo/basic-demo/basic-demo.component';
import { SizesDemoComponent as AvatarSizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { ShapesDemoComponent as AvatarShapesDemoComponent } from './demo/shapes-demo/shapes-demo.component';

import { BadgesDemoComponent as AvatarBadgesDemoComponent } from './demo/badges-demo/badges-demo.component';
import { TextLabelsDemoComponent as AvatarTextLabelsDemoComponent } from './demo/text-labels-demo/text-labels-demo.component';
import { StatesDemoComponent as AvatarStatesDemoComponent } from './demo/states-demo/states-demo.component';
import { GradientsDemoComponent as AvatarGradientsDemoComponent } from './demo/gradients-demo/gradients-demo.component';
import { AccessibilityDemoComponent as AvatarAccessibilityDemoComponent } from './demo/accessibility-demo/accessibility-demo.component';
import { AvatarInitialsComponent } from './demo/initials/initials.component';
const routes: Routes = [
  { path: '', component: AppAvatarsComponent },
  { path: 'basic', component: AvatarBasicDemoComponent },
  { path: 'sizes', component: AvatarSizesDemoComponent },
  { path: 'shapes', component: AvatarShapesDemoComponent },
  { path: 'badges', component: AvatarBadgesDemoComponent, },
  { path: 'text-labels', component: AvatarTextLabelsDemoComponent, },
  { path: 'states', component: AvatarStatesDemoComponent },
  { path: 'initials', component: AvatarInitialsComponent },
  { path: 'gradients', component: AvatarGradientsDemoComponent },
  { path: 'accessibility', component: AvatarAccessibilityDemoComponent, },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AvatarBasicDemoComponent,
    AvatarSizesDemoComponent,
    AvatarShapesDemoComponent,
    AvatarBadgesDemoComponent,
    AvatarTextLabelsDemoComponent,
    AvatarStatesDemoComponent,
    AvatarGradientsDemoComponent,
    AvatarAccessibilityDemoComponent
  ]
})
export class AvatarModule { }
