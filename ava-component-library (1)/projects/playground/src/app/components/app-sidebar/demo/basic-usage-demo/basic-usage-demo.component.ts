import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSidebarComponent, AavaIconComponent } from '@aava/play-core';

interface SidebarItem {
  icon: string;
  label: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaSidebarComponent, AavaIconComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class BasicUsageDemoComponent {
  isCollapsed = signal<boolean>(false);
  sidebarWidth = signal<string>('280px');
  collapsedSidebarWidth = signal<string>('70px');

  // Menu items data
  menuItems: SidebarItem[] = [
    { icon: 'Home', label: 'Dashboard', active: true },
    { icon: 'Users', label: 'Users' },
    { icon: 'FileText', label: 'Projects' },
    { icon: 'ChartBar', label: 'Analytics' },
    { icon: 'Settings', label: 'Settings' },
  ];

  onCollapseToggle(collapsed: boolean): void {
    this.isCollapsed.set(collapsed);
  }

  mainContentMargin(): string {
    return this.isCollapsed()
      ? this.collapsedSidebarWidth()
      : this.sidebarWidth();
  }
}
