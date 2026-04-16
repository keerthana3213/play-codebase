import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';
import { BasicComponent } from './demo/basic/basic.component';
import { WithoutNavigationComponent } from './demo/without-navigation/without-navigation.component';
import { WithoutSearchComponent } from './demo/without-search/without-search.component';
import { MobileViewComponent } from './demo/mobile-view/mobile-view.component';

const routes: Routes = [
  { path: '', component: AppHeaderComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'without-navigation', component: WithoutNavigationComponent },
  { path: 'without-search', component: WithoutSearchComponent },
  { path: 'mobile-view', component: MobileViewComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HeaderModule {}
