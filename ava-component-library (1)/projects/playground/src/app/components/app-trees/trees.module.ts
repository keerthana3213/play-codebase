import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './demo/basic/basic.component';
import { EventComponent } from './demo/event/event.component';
import { IconsComponent } from './demo/icons/icons.component';
import { MultiSelectComponent } from './demo/multi-select/multi-select.component';
import { SingleSelectComponent } from './demo/single-select/single-select.component';
import { AppTreesComponent } from './app-trees.component';

const routes: Routes = [
  { path: '', component: AppTreesComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'event', component: EventComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'single-select', component: SingleSelectComponent },
  { path: 'multi-select', component: MultiSelectComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TreesModule {}
