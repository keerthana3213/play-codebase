import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordDemoComponent } from './reset-password-demo.component';
import { BasicComponent } from './demos/basic/basic.component';
import { SizesComponent } from './demos/sizes/sizes.component';
import { WithConfirmationComponent } from './demos/with-confirmation/with-confirmation.component';
import { CustomComponent } from './demos/custom/custom.component';

const routes: Routes = [
  { path: '', component: ResetPasswordDemoComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'size', component: SizesComponent },
  { path: 'with-confirmation', component: WithConfirmationComponent },
  { path: 'custom', component: CustomComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ResetPasswordModule {}
