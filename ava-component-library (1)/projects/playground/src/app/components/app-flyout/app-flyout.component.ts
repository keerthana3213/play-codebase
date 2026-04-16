import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyoutBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { FlyoutAlignmentDemoComponent } from './demo/alignment-demo/alignment-demo.component';
import { FlyoutOverlayDemoComponent } from './demo/overlay-demo/overlay-demo.component';

@Component({
    selector: 'awe-app-flyout',
    standalone: true,
    imports: [
        CommonModule,
        FlyoutBasicUsageDemoComponent,
        FlyoutAlignmentDemoComponent,
        FlyoutOverlayDemoComponent
    ],
    templateUrl: './app-flyout.component.html',
    styleUrl: './app-flyout.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AppFlyoutComponent {
    sections = [
        {
            title: 'Basic Usage',
            description: 'Simple flyout that opens relative to a trigger element.',
            showCode: false
        },
        {
            title: 'Alignment',
            description: 'Demonstrating different alignment options: left, right, top, bottom.',
            showCode: false
        },
        {
            title: 'Overlay',
            description: 'Flyout with an overlay backdrop and click-to-close behavior.',
            showCode: false
        }
    ];

    apiProps = [
        { name: 'width', type: 'number', default: '0', description: 'Width of the panel in pixels (0 for auto)' },
        { name: 'alignment', type: "'left' | 'right' | 'top' | 'bottom'", default: "'left'", description: 'Alignment relative to trigger' },
        { name: 'overlay', type: 'boolean', default: 'false', description: 'Whether to show a backdrop' },
        { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', description: 'Close when backdrop is clicked' },
        { name: 'offsetTop', type: 'number', default: '0', description: 'Vertical positioning offset' },
        { name: 'offsetLeft', type: 'number', default: '0', description: 'Horizontal positioning offset' }
    ];

    toggleCodeVisibility(index: number, event: MouseEvent): void {
        event.stopPropagation();
        this.sections[index].showCode = !this.sections[index].showCode;
    }

    getExampleCode(section: string): string {
        const examples: Record<string, string> = {
            'basic usage': `
<button #trigger (click)="flyout.open(trigger)">Open Basic Flyout</button>
<aava-flyout #flyout>
  <div class="content">...</div>
</aava-flyout>`,
            'alignment': `
<aava-flyout [alignment]="'right'">...</aava-flyout>
<aava-flyout [alignment]="'top'">...</aava-flyout>`,
            'overlay': `
<aava-flyout [overlay]="true" [closeOnOverlayClick]="true">...</aava-flyout>`
        };
        return examples[section] || '';
    }

    copyCode(section: string): void {
        const code = this.getExampleCode(section);
        navigator.clipboard.writeText(code);
    }
}
