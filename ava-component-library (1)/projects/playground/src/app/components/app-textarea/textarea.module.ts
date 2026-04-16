import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppTextareaComponent } from './app-textarea.component';
import { TextareaBasicDemoComponent } from './demo/textarea-basic-demo/textarea-basic-demo.component';
import { TextareaSizesDemoComponent } from './demo/textarea-sizes-demo/textarea-sizes-demo.component';
import { TextareaVariantsDemoComponent } from './demo/textarea-variants-demo/textarea-variants-demo.component';
import { TextareaEventsDemoComponent } from './demo/textarea-events-demo/textarea-events-demo.component';
import { TextareaAccessibilityDemoComponent } from './demo/textarea-accessibility-demo/textarea-accessibility-demo.component';
import { TextareaApiDemoComponent } from './demo/textarea-api-demo/textarea-api-demo.component';
import { TextareaIconsDemoComponent } from './demo/textarea-icons-demo/textarea-icons-demo.component';
import { TextareaCounterVariantComponent } from './demo/textarea-counter-variant/textarea-counter-variant.component';


const routes: Routes = [
  {path: '', component: AppTextareaComponent},
  { path: 'basic-usage', component: TextareaBasicDemoComponent },
  { path: 'sizes', component: TextareaSizesDemoComponent },
  { path: 'variants', component: TextareaVariantsDemoComponent },
  { path: 'events', component: TextareaEventsDemoComponent },
  { path: 'icons', component: TextareaIconsDemoComponent },
  { path: 'accessibility',component: TextareaAccessibilityDemoComponent,},
  { path: 'app-textarea-counter', component: TextareaCounterVariantComponent },
  { path: 'api', component: TextareaApiDemoComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TextareaBasicDemoComponent,
        TextareaSizesDemoComponent,
        TextareaVariantsDemoComponent,
        TextareaEventsDemoComponent,
        TextareaIconsDemoComponent,
        TextareaAccessibilityDemoComponent,
        TextareaCounterVariantComponent,
        TextareaApiDemoComponent
      
    ]
})
export class TextareaModule { }
