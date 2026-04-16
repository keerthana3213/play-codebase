import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';

@Component({
    selector: 'awe-app-loader',
    standalone: true,
    imports: [
        CommonModule,
        LoaderBasicUsageDemoComponent,
    ],
    templateUrl: './app-loader.component.html',
    styleUrl: './app-loader.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AppLoaderComponent {
    sections = [
        {
            title: 'Basic Usage',
            description: 'Standard usage of the loader component with default styling.',
            showCode: false
        },
        {
            title: 'Custom Styling',
            description: 'Demonstrating how to apply custom styles to the loader container.',
            showCode: false
        }
    ];

    apiProps = [
        {
            name: 'customStyles',
            type: 'Record<string, string>',
            default: '{}',
            description: 'Custom CSS styles to apply to the loader container'
        },
        {
            name: 'id',
            type: 'string',
            default: "''",
            description: 'Unique identifier for the loader'
        }
    ];

    toggleCodeVisibility(index: number, event: MouseEvent): void {
        event.stopPropagation();
        this.sections[index].showCode = !this.sections[index].showCode;
    }

    getExampleCode(section: string): string {
        const examples: Record<string, string> = {
            'basic usage': `
<aava-loader>
  <div class="loading-content">
    <p>Loading data...</p>
  </div>
</aava-loader>`,
            'custom styling': `
<aava-loader [customStyles]="{'background-color': '#f0f9ff', 'border': '2px dashed #0ea5e9', 'border-radius': '12px'}">
  <div class="custom-loading">
    <span class="pulse-icon">⚡</span>
    <p>Processing request...</p>
  </div>
</aava-loader>`
        };
        return examples[section] || '';
    }

    copyCode(section: string): void {
        const code = this.getExampleCode(section);
        navigator.clipboard.writeText(code);
    }
}
