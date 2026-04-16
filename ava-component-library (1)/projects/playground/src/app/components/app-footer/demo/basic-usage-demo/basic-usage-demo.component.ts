import { Component } from '@angular/core';
import { AavaFooterComponent, AavaFooterLeftComponent, AavaFooterRightComponent, AavaLinkComponent, AavaIconComponent } from '@aava/play-core';

@Component({
    selector: 'app-footer-basic-usage',
    standalone: true,
    imports: [AavaFooterComponent, AavaFooterLeftComponent, AavaFooterRightComponent, AavaLinkComponent, AavaIconComponent],
    templateUrl: './basic-usage-demo.component.html',
    styleUrl: './basic-usage-demo.component.scss'
})
export class FooterBasicUsageDemoComponent { }
