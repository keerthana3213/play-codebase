import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBasicUsageDemoComponent } from './demo/basic-usage-demo/basic-usage-demo.component';
import { LayoutSidebarToggleDemoComponent } from './demo/sidebar-toggle-demo/sidebar-toggle-demo.component';
import { LayoutCustomWidthsDemoComponent } from './demo/custom-widths-demo/custom-widths-demo.component';
import { InteractiveDemoComponent } from './demo/interactive-demo/interactive-demo.component';

@Component({
  selector: 'app-layout-demo',
  standalone: true,
  imports: [
    CommonModule,
    LayoutBasicUsageDemoComponent,
    LayoutSidebarToggleDemoComponent,
    LayoutCustomWidthsDemoComponent,
    InteractiveDemoComponent
  ],
  templateUrl: './app-layout-demo.component.html',
  styleUrl: './app-layout-demo.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppLayoutDemoComponent {
  sections = [
    {
      title: 'Basic Usage',
      description: 'Simple layout with header and footer slots.',
      showCode: false
    },
    {
      title: 'Sidebar Toggles',
      description: 'Interactive demo showing how to toggle left and right panels.',
      showCode: false
    },
    {
      title: 'Custom Dimensions',
      description: 'Demonstrating adjustable header height and sidebar widths.',
      showCode: false
    },
    {
      title: 'Interactive Demo',
      description: 'Interactive demo showing how to toggle left and right panels.',
      showCode: false
    }
  ];

  apiProps = [
    { name: 'headerHeight', type: 'string', default: "'100px'", description: 'Height of the header section' },
    { name: 'leftPanelWidth', type: 'string', default: "'100px'", description: 'Width of the left panel' },
    { name: 'rightPanelWidth', type: 'string', default: "'300px'", description: 'Width of the right panel' },
    { name: 'showLeftPanel', type: 'boolean', default: 'true', description: 'Whether to enable the left panel' },
    { name: 'leftPanelOpen', type: 'boolean', default: 'false', description: 'Open/close state of left panel' },
    { name: 'footerMode', type: "'sticky' | 'scrollable'", default: "'sticky'", description: 'Footer positioning behavior' }
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
<aava-layout headerHeight="60px" footerHeight="40px">
  <div slot="header">Header</div>
  <div>Main Content</div>
  <div slot="footer">Footer</div>
</aava-layout>`,
      'sidebar toggles': `
<aava-layout [(leftPanelOpen)]="isOpen" [showLeftPanel]="true">
  <div slot="left-panel">Sidebar</div>
  <div>Main Content</div>
</aava-layout>`,
      'custom dimensions': `
<aava-layout [leftPanelWidth]="'300px'" [headerHeight]="'80px'">
  ...
</aava-layout>`
    };
    return examples[section] || '';
  }

  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code);
  }
}
