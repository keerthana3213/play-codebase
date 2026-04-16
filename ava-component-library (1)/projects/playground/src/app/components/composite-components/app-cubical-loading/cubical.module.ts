import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './demos/basic/basic.component';
import { CustomComponent } from './demos/custom/custom.component';
import { GradientBackgroundsComponent } from './demos/gradient-backgrounds/gradient-backgrounds.component';
import { SolidColorsComponent } from './demos/solid-colors/solid-colors.component';
import { AppCubicalLoadingComponent } from './app-cubical-loading.component';

const routes: Routes = [
  { path: '', component: AppCubicalLoadingComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'solid', component: SolidColorsComponent },
  { path: 'gradient', component: GradientBackgroundsComponent },
  { path: 'custom', component: CustomComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CubicalModule {}
