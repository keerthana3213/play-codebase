import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
} from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaDrawerComponent, AavaButtonComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class BasicUsageDemoComponent {
  isDrawerOpen = false;

  openDrawer(): void {
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  onDrawerOpened(): void {
    console.log('Drawer opened');
  }

  onDrawerClosed(): void {
    console.log('Drawer closed');
  }
}
