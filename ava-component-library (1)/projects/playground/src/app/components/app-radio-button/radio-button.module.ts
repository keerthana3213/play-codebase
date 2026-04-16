import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRadiobuttonComponent } from './app-radiobutton.component';
import { BasicUsageDemoComponent as RadioBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { OrientationsDemoComponent } from './demo/orientations-demo/orientations-demo.component';
import { SizesDemoComponent as RadioSizesDemoComponent } from './demo/sizes-demo/sizes-demo.component';
import { CustomColorsDemoComponent } from './demo/custom-colors-demo/custom-colors-demo.component';
import { AnimationsDemoComponent } from './demo/animations-demo/animations-demo.component';
import { StatesDemoComponent as RadioStatesDemoComponent } from './demo/states-demo/states-demo.component';
import { FormIntegrationDemoComponent } from './demo/form-integration-demo/form-integration-demo.component';
import { ApiDemoComponent as RadioApiDemoComponent } from './demo/api-demo/api-demo.component';

const routes: Routes = [
  { path: '', component: AppRadiobuttonComponent },
  { path: 'basic-usage', component: RadioBasicUsageDemoComponent },
  { path: 'orientations', component: OrientationsDemoComponent },
  { path: 'sizes', component: RadioSizesDemoComponent },
  { path: 'custom-colors', component: CustomColorsDemoComponent },
  { path: 'animations', component: AnimationsDemoComponent },
  { path: 'states', component: RadioStatesDemoComponent },
  {
    path: 'form-integration',
    component: FormIntegrationDemoComponent,
  },
  { path: 'api', component: RadioApiDemoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RadiobuttonModule {}
