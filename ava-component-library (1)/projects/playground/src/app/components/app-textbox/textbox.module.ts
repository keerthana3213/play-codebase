import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppTextboxComponent } from './app-textbox.component';
import { TextboxBasicUsageComponent } from './demo/textbox-basic-usage/textbox-basic-usage.component';
import { TextboxVariantsComponent } from './demo/textbox-variants/textbox-variants.component';
import { TextboxSizesComponent } from './demo/textbox-sizes/textbox-sizes.component';
import { TextboxIconsAffixesComponent } from './demo/textbox-icons-affixes/textbox-icons-affixes.component';
import { TextboxStatesValidationComponent } from './demo/textbox-states-validation/textbox-states-validation.component';
import { TextboxProcessingEffectsComponent } from './demo/textbox-processing-effects/textbox-processing-effects.component';
import { TextboxFormIntegrationComponent } from './demo/textbox-form-integration/textbox-form-integration.component';
import { TextboxGlassEffectsComponent } from './demo/textbox-glass-effects/textbox-glass-effects.component';
import { TextboxPhoneNumberComponent } from './demo/textbox-phone-number/textbox-phone-number.component';
import { TextboxOtpComponent } from './demo/textbox-otp/textbox-otp.component';
import { TextboxMaskingDemoComponent } from './demo/textbox-masking-demo/textbox-masking-demo.component';


const routes: Routes = [
    { path:'', component:AppTextboxComponent},
    { path: 'basic-usage', component: TextboxBasicUsageComponent },
    { path: 'variants', component: TextboxVariantsComponent },
    { path: 'sizes', component: TextboxSizesComponent },
    { path: 'icons-affixes', component: TextboxIconsAffixesComponent },
    { path: 'states-validation',component: TextboxStatesValidationComponent,},
    { path: 'processing-effects',component: TextboxProcessingEffectsComponent,},
    { path: 'form-integration',component: TextboxFormIntegrationComponent,},
    { path: 'glass-effects', component: TextboxGlassEffectsComponent },
    { path: 'phone-number', component: TextboxPhoneNumberComponent },
    { path: 'otp', component: TextboxOtpComponent },
    { path: 'masking', component: TextboxMaskingDemoComponent },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppTextboxComponent,
        TextboxBasicUsageComponent,
        TextboxVariantsComponent,
        TextboxSizesComponent,
        TextboxIconsAffixesComponent,
        TextboxStatesValidationComponent,
        TextboxProcessingEffectsComponent,
        TextboxFormIntegrationComponent,
        TextboxGlassEffectsComponent,
        TextboxPhoneNumberComponent,
        TextboxOtpComponent,
        TextboxOtpComponent,
        TextboxMaskingDemoComponent

    ]
})
export class TextboxModule { }
