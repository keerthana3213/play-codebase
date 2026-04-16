import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCarouselComponent } from './app-carousel.component';
import { BasicComponent } from './demo/basic/basic.component';
import { WithTitleComponent } from './demo/with-title/with-title.component';
import { AutoplayComponent } from './demo/autoplay/autoplay.component';
import { SizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';

const routes: Routes = [
  { path: '', component: AppCarouselComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'size', component: SizesDemoComponent },
  { path: 'autoplay', component: AutoplayComponent },
  { path: 'title', component: WithTitleComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CarouselModule {}
