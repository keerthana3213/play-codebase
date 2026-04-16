import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRatingsComponent } from './app-ratings.component';
import { BasicUsageDemoComponent as RatingBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { SizesDemoComponent as RatingSizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { HalfStarDemoComponent } from './demo/half-star-demo/half-star-demo.component';
import { ReadonlyDemoComponent as RatingReadonlyDemoComponent } from './demo/readonly-demo/readonly-demo.component';
import { ShowValueDemoComponent } from './demo/show-value-demo/show-value-demo.component';
import { CustomMaximumDemoComponent } from './demo/custom-maximum-demo/custom-maximum-demo.component';

const routes: Routes = [
  { path: '', component: AppRatingsComponent },
  { path: 'basic-usage', component: RatingBasicUsageDemoComponent },
  { path: 'sizes', component: RatingSizesDemoComponent },
  { path: 'half-star', component: HalfStarDemoComponent },
  { path: 'readonly', component: RatingReadonlyDemoComponent },
  { path: 'show-value', component: ShowValueDemoComponent },
  { path: 'custom-maximum', component: CustomMaximumDemoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RatingModule {}
