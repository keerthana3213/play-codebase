import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDividersComponent } from '@aava/play-core';

@Component({
  selector: 'ava-orientation-demo',
  standalone: true,
  imports: [CommonModule, AavaDividersComponent],
  templateUrl: './orientation-demo.component.html',
  styleUrls: ['./orientation-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrientationDemoComponent {
  copyCode(codeType: string): void {
    const codeExamples: Record<string, string> = {
      horizontal: `<aava-dividers variant="solid" orientation="horizontal" color="#007bff"></aava-dividers>`,
      vertical: `<aava-dividers variant="solid" orientation="vertical" color="#dc3545"></aava-dividers>`,
      layout: `
<div class="layout-demo">
  <div class="sidebar">
    <h4>Sidebar Content</h4>
  </div>
  
  <aava-dividers variant="solid" orientation="vertical"></aava-dividers>
  
  <div class="main-content">
    <h4>Main Content</h4>
  </div>
</div>`,
    };

    const code = codeExamples[codeType] || '';
    navigator.clipboard.writeText(code);
  }
}
