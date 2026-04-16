import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
// NOTE: If you see a linter error about unknown inputs, ensure that the ava-tabs component is built and the playground is using the latest version with the new inputs (tabRowWrapperStyles, tabRowBackgroundStyles). If the import below is correct, this error will resolve after a rebuild.
import { AavaTabsComponent, TabItem } from '@aava/play-core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'awe-app-tabs',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent, RouterModule],
  templateUrl: './app-tabs.component.html',
  styleUrl: './app-tabs.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppTabsComponent {
  // Default tabs demo
  basicTabs: TabItem[] = [
    {
      id: 'Tab1',
      label: 'Tab1',
      content:
        '<p>Welcome to the home page! This is where you can find the latest updates and news.</p>',
      iconName: 'circle-check',
    },
    {
      id: 'Tab2',
      label: 'Tab2',
      content:
        '<p>Learn more about our company, mission, and values. We are committed to excellence.</p>',
      iconName: 'circle-check',
    },
    {
      id: 'Tab3',
      label: 'Tab3',
      content:
        '<p>Explore our comprehensive range of services designed to meet your needs.</p>',
      iconName: 'circle-check',
    },
    {
      id: 'Tab4',
      label: 'Tab4',
      content: '<p>Get in touch with us. We would love to hear from you!</p>',
      iconName: 'circle-check',
    },
  ];

  // Button variant tabs
  buttonTabs: TabItem[] = [
    {
      id: 'Tab1',
      label: 'Tab1',
      content: '<p>Project overview and key metrics dashboard.</p>',
    },
    {
      id: 'Tab2',
      label: 'Tab2',
      content: '<p>Detailed analytics and performance insights.</p>',
    },
    {
      id: 'Tab3',
      label: 'Tab3',
      content: '<p>Generate and view comprehensive reports.</p>',
    },
    {
      id: 'Tab4',
      label: 'Tab4',
      content: '<p>Configure your project settings and preferences.</p>',
    },
  ];
  // Button variant tabs for xs,sm and md sizes
  ButtonTabs: TabItem[] = [
    {
      id: 'Tab1',
      label: 'Tab1',
      iconName: 'chevron-right',
      content: '<p>Project overview and key metrics dashboard.</p>',
    },
    {
      id: 'Tab2',
      label: 'Tab2',
      iconName: 'chevron-right',
      content: '<p>Detailed analytics and performance insights.</p>',
    },
    {
      id: 'Tab3',
      label: 'Tab3',
      iconName: 'chevron-right',
      content: '<p>Generate and view comprehensive reports.</p>',
    },
    {
      id: 'Tab4',
      label: 'Tab4',
      iconName: 'chevron-right',
      content: '<p>Configure your project settings and preferences.</p>',
    },
  ];

  // Custom styles for active button tab
  customActiveButtonTabStyles = {
    background:
      'linear-gradient(135deg, rgba(233, 30, 99, 1) 0%, rgba(156, 39, 176, 1) 100%)',
    color: '#fff',
    borderColor: '#fff',
    boxShadow: '0 2px 8px 0 rgba(255, 45, 85, 0.18)',
    iconColor: '#fff',
    borderRadius: '40px',
  };

  // Icon-only tabs
  iconTabs: TabItem[] = [
    {
      id: 'Tab1',
      label: 'Tab1',
      content: '<p>Main dashboard with key metrics and KPIs.</p>',
      iconName: 'circle-check',
    },
    {
      id: 'Tab2',
      label: 'Tab2',
      content: '<p>User management and administration panel.</p>',
      iconName: 'circle-check',
    },
    {
      id: 'Tab3',
      label: 'Tab3',
      content: '<p>System settings and configuration options.</p>',
      iconName: 'circle-check',
    },
    {
      id: 'Tab4',
      label: 'Tab4',
      content: '<p>Help documentation and support resources.</p>',
      iconName: 'circle-check',
    },
  ];

  // Advanced tabs with all features
  advancedTabs: TabItem[] = [
    {
      id: 'projects',
      label: 'Projects',
      subtitle: 'Manage your work',
      content: 'View and manage all your active projects in one place.',
      iconName: 'circle-check',
      badge: '12',
    },
    {
      id: 'tasks',
      label: 'Tasks',
      subtitle: 'Track progress',
      content: 'Keep track of your tasks and deadlines efficiently.',
      iconName: 'circle-check',
      badge: '7',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      subtitle: 'Schedule events',
      content: 'Manage your schedule and upcoming events.',
      iconName: 'circle-check',
    },
    {
      id: 'messages',
      label: 'Messages',
      subtitle: 'Communication hub',
      content: 'Access your messages and team communications.',
      iconName: 'circle-check',
      badge: '3',
    },
    {
      id: 'files',
      label: 'Files',
      subtitle: 'Document storage',
      content: 'Organize and access your files and documents.',
      iconName: 'circle-check',
    },
  ];

  axosAdvancedTabs: TabItem[] = [
    {
      id: 'invoiceDate',
      label: 'Invoice Date',
      badge: '02/04-03/04',
    },
    {
      id: 'dueDate',
      label: 'Due Date',
      badge: 'NA',
    },
    {
      id: 'birthdate',
      label: 'Birthdate',
      badge: '02/04-03/04',
    },
  ];

  // Many tabs for scrollable demo
  manyTabs: TabItem[] = [
    {
      id: 'tab1',
      label: 'Dashboard',
      content: '<p>Dashboard content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab2',
      label: 'Analytics',
      content: '<p>Analytics content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab3',
      label: 'Reports',
      content: '<p>Reports content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab4',
      label: 'Users',
      content: '<p>Users content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab5',
      label: 'Settings',
      content: '<p>Settings content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab6',
      label: 'Billing',
      content: '<p>Billing content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab7',
      label: 'Support',
      content: '<p>Support content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab8',
      label: 'Documentation',
      content: '<p>Documentation content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab9',
      label: 'API',
      content: '<p>API content</p>',
      iconName: 'circle-check',
    },
    {
      id: 'tab10',
      label: 'Integrations',
      content: '<p>Integrations content</p>',
      iconName: 'circle-check',
    },
  ];

  // State management
  activeTabIds = {
    basic: 'home',
    button: 'overview',
    icon: 'dashboard',
    advanced: 'projects',
    axos: 'invoiceDate',
    scrollable: 'tab1',
  };

  // Event handlers
  onTabChange(tab: TabItem, context: string): void {
    console.log(`Tab changed in ${context}:`, tab);
    switch (context) {
      case 'basic':
        this.activeTabIds.basic = tab.id;
        break;
      case 'button':
        this.activeTabIds.button = tab.id;
        break;
      case 'icon':
        this.activeTabIds.icon = tab.id;
        break;
      case 'advanced':
        this.activeTabIds.advanced = tab.id;
        break;
      case 'scrollable':
        this.activeTabIds.scrollable = tab.id;
        break;
    }
  }

  onTabClose(tab: TabItem, context: string): void {
    console.log(`Tab closed in ${context}:`, tab);
    switch (context) {
      case 'advanced':
        this.advancedTabs = this.advancedTabs.filter((t) => t.id !== tab.id);
        break;
      case 'scrollable':
        this.manyTabs = this.manyTabs.filter((t) => t.id !== tab.id);
        break;
    }
  }

  onDropdownToggle(isOpen: boolean, context: string): void {
    console.log(`Dropdown toggled in ${context}:`, isOpen);
  }

  // Demo: Custom tab row wrapper and background styles
  pillTabRowWrapperStyles = {
    borderRadius: '9999px',
    border: '2px solid #e0e7ef',
    padding: '0.25rem 0.5rem',
    boxShadow: '0 2px 8px 0 rgba(42, 123, 155, 0.08)',
  };
  pillTabRowBackgroundStyles = {
    background: 'linear-gradient(90deg, #e0f7fa 0%, #fce4ec 100%)',
    borderRadius: '9999px',
    boxShadow: '0 2px 8px 0 rgba(42, 123, 155, 0.08)',
  };
  coloredTabRowWrapperStyles = {
    borderRadius: '16px',
    border: '1px solid #e0e7ef',
    background: '#f3f4f6',
    padding: '0.5rem 1rem',
  };
  coloredTabRowBackgroundStyles = {
    background: 'rgba(233, 30, 99, 0.08)',
    borderRadius: '16px',
  };

  // Demo: Navigation-only tabs (no content panels)
  navigationTabs: TabItem[] = [
    { id: 'nav-home', label: 'Tab1', iconName: 'circle-check' },
    { id: 'nav-products', label: 'Tab2', iconName: 'circle-check' },
    { id: 'nav-services', label: 'Tab3', iconName: 'circle-check' },
    { id: 'nav-about', label: 'Tab4', iconName: 'circle-check' },
    { id: 'nav-contact', label: 'Tab5', iconName: 'circle-check' },
  ];

  // Demo: Custom badge styles
  customBadgeStyles = {
    background: 'grey',
    color: '#fff',
    fontSize: '0.875rem',
    padding: '4px 8px',
    fontWeight: 'var(--global-font-weight-semibold)',
  };
}
