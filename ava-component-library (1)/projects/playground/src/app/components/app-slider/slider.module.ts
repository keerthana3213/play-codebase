import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Main Slider Component
import { AppSliderComponent } from './app-slider.component';

// Slider Demo Components
import { SliderBasicDemoComponent } from './demo/basic-usage-demo/slider-basic-demo.component';
import { SliderSizesDemoComponent } from './demo/sizes-demo/slider-sizes-demo.component';
import { SliderStatesDemoComponent } from './demo/states-demo/slider-states-demo.component';
import { MultiRangeDemoComponent } from './demo/multi-range-demo/multi-range-demo.component';
import { SliderInputVariantDemoComponent } from './demo/input-variant-demo/slider-input-variant-demo.component';
import { IconThumbDemoComponent } from './demo/icon-thumb-demo/icon-thumb-demo.component';
import { SliderOrientationDemoComponent } from './demo/orientations-demo/slider-orientation-demo.component';
import { SliderApiDemoComponent } from './demo/api-demo/slider-api-demo.component';

const routes: Routes = [
  { path: '', component: AppSliderComponent },
  { path: 'basic-usage', component: SliderBasicDemoComponent },
  { path: 'sizes', component: SliderSizesDemoComponent },
  { path: 'states', component: SliderStatesDemoComponent },
  { path: 'multi-range', component: MultiRangeDemoComponent },
  { path: 'input-variant', component: SliderInputVariantDemoComponent },
  { path: 'icon-thumb', component: IconThumbDemoComponent },
  { path: 'orientations', component: SliderOrientationDemoComponent },
  { path: 'api', component: SliderApiDemoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppSliderComponent,
    SliderBasicDemoComponent,
    SliderSizesDemoComponent,
    SliderStatesDemoComponent,
    MultiRangeDemoComponent,
    SliderInputVariantDemoComponent,
    IconThumbDemoComponent,
    SliderOrientationDemoComponent,
    SliderApiDemoComponent,
  ]
})
export class SliderModule { }
