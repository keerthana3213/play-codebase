import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AavaCustomSidebarComponent } from '../../../../../play-core/src/lib/composite-components/custom-sidebar/aava-custom-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
export interface SidebarItem {
  id: string;
  icon: string;
  text: string;
  route?: string;
  active?: boolean;
}
@Component({
  selector: 'app-test-custom-sidebar',
  standalone: true,
  imports: [CommonModule, AavaCustomSidebarComponent, HttpClientModule],
  templateUrl: './test-custom-sidebar.component.html',
  styleUrl: './test-custom-sidebar.component.scss',
})
export class TestCustomSidebarComponent {
  logoUrl = '../../../assets/ascendion.png';
  avatarUrl = '../../../assets/1.svg';
  logoUrl_collapsed = '../../../assets/ascendion_logo.svg';

  sidebarItems: SidebarItem[] = [
    {
      id: '1',
      icon: 'layout-dashboard',
      text: 'Dashboard',
      route: '/dashboard',
      active: true,
    },
    {
      id: '2',
      icon: 'users',
      text: 'Analyser',
      route: '/requirement-analyser',
    },
    {
      id: '3',
      icon: 'shield-check',
      text: 'Test Case Scenario',
      route: '/test-case-scenario',
    },
    {
      id: '5',
      icon: 'code',
      text: 'Automation Creation',
      route: '/automation-script',
      active: false,
    },
    {
      id: '6',
      icon: 'refresh-cw',
      text: 'Conversion',
      route: '/conversion',
      active: false,
    },
    {
      id: '7',
      icon: 'zap',
      text: 'Test Optimization',
      route: '/test-optimization',
      active: false,
    },
    {
      id: '8',
      icon: 'file-text',
      text: 'Data Management',
      route: '/data-management',
      active: false,
    },
    {
      id: '9',
      icon: 'clock',
      text: 'Request History',
      route: '/request-history',
      active: false,
    },
    { id: '10', icon: 'shield-check', text: 'Ask Me', route: '/ask-me' },
  ];

  isLargeCollapsed = false;
  isMediumCollapsed = false;
  isSmallCollapsed = false;

  onSidebarCollapse(isCollapsed: boolean, size: 'lg' | 'md' | 'sm') {
    if (size === 'lg') this.isLargeCollapsed = isCollapsed;
    if (size === 'md') this.isMediumCollapsed = isCollapsed;
    if (size === 'sm') this.isSmallCollapsed = isCollapsed;

    console.log(size, 'sidebar collapsed:', isCollapsed);
  }

  onSidebarItemClick(item: SidebarItem) {
    console.log('Clicked item:', item);
  }

  onSidebarSearch(searchValue: string) {
    console.log('Search value from sidebar:', searchValue);
  }
}
