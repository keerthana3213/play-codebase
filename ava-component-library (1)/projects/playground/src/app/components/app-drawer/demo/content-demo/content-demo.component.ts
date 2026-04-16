import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
  AavaTextboxComponent,
  AavaCheckboxComponent,
} from '@aava/play-core';

@Component({
  selector: 'ava-content-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaDrawerComponent,
    AavaButtonComponent,
    AavaTextboxComponent,
    AavaCheckboxComponent,
  ],
  templateUrl: './content-demo.component.html',
  styleUrl: './content-demo.component.scss',
})
export class ContentDemoComponent {
  // Content structure examples
  basicContentDrawerOpen = false;
  headerFooterDrawerOpen = false;
  customHeaderDrawerOpen = false;
  formDrawerOpen = false;
  complexContentDrawerOpen = false;

  openDrawer(type: string): void {
    switch (type) {
      case 'basic':
        this.basicContentDrawerOpen = true;
        break;
      case 'header-footer':
        this.headerFooterDrawerOpen = true;
        break;
      case 'custom-header':
        this.customHeaderDrawerOpen = true;
        break;
      case 'form':
        this.formDrawerOpen = true;
        break;
      case 'complex':
        this.complexContentDrawerOpen = true;
        break;
    }
  }

  closeDrawer(type: string): void {
    switch (type) {
      case 'basic':
        this.basicContentDrawerOpen = false;
        break;
      case 'header-footer':
        this.headerFooterDrawerOpen = false;
        break;
      case 'custom-header':
        this.customHeaderDrawerOpen = false;
        break;
      case 'form':
        this.formDrawerOpen = false;
        break;
      case 'complex':
        this.complexContentDrawerOpen = false;
        break;
    }
  }
}
