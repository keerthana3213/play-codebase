import { TabItem } from '@aava/play-core';

// Basic tabs demo
export const basicTabs: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    content:
      '<div><h3>Welcome Home</h3><p>This is the home tab. Here you can find the latest updates and featured content.</p></div>',
    iconName: 'home',
  },
  {
    id: 'about',
    label: 'About',
    content:
      '<p>Learn more about our company, mission, and values. We are committed to excellence.</p>',
    iconName: 'info',
  },
  {
    id: 'services',
    label: 'Services',
    content:
      '<p>Explore our comprehensive range of services designed to meet your needs.</p>',
    iconName: 'briefcase',
  },
  {
    id: 'contact',
    label: 'Contact',
    content: '<p>Get in touch with us. We would love to hear from you!</p>',
    iconName: 'phone',
  },
];

// Button variant tabs
export const buttonTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    iconName: 'layout',
    content: '<p>Project overview and key metrics dashboard.</p>',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    iconName: 'chart-no-axes-combined',
    content: '<p>Detailed analytics and performance insights.</p>',
  },
  {
    id: 'reports',
    label: 'Reports',
    iconName: 'file-text',
    content: '<p>Generate and view comprehensive reports.</p>',
  },
  {
    id: 'settings',
    label: 'Settings',
    iconName: 'settings',
    content: '<p>Configure your project settings and preferences.</p>',
  },
  {
    id: 'billing',
    label: 'Billing',
    iconName: 'credit-card',
    content: '<p>Manage your billing and subscription.</p>',
  },
];

// Vertical orientation tabs
export const verticalTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    iconName: 'layout',
    content: '<p>Project overview and key metrics dashboard.</p>',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    iconName: 'chart-no-axes-combined',
    content: '<p>Detailed analytics and performance insights.</p>',
  },
  {
    id: 'reports',
    label: 'Reports',
    iconName: 'file-text',
    content: '<p>Generate and view comprehensive reports.</p>',
  },
  {
    id: 'settings',
    label: 'Settings',
    iconName: 'settings',
    content: '<p>Configure your project settings and preferences.</p>',
  },
  {
    id: 'billing',
    label: 'Billing',
    iconName: 'credit-card',
    content: '<p>Manage your billing and subscription.</p>',
  },
  {
    id: 'help',
    label: 'Help',
    iconName: 'help-circle',
    content: '<p>Get help and support for your project.</p>',
  },
];

// Custom styles for active button tab
export const customActiveButtonTabStyles = {
  background:
    'radial-gradient(circle,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 55%, rgba(237, 221, 83, 1) 100%)',
  color: '#fff',
  borderColor: '#fff',
  boxShadow: '0 2px 8px 0 rgba(255, 45, 85, 0.18)',
  iconColor: '#fff',
  borderRadius: '40px',
};

// Icon-only tabs
export const iconTabs: TabItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    content: '<p>Main dashboard with key metrics and KPIs.</p>',
    iconName: 'layout',
  },
  {
    id: 'users',
    label: 'Users',
    content: '<p>User management and administration panel.</p>',
    iconName: 'users',
  },
  {
    id: 'settings',
    label: 'Settings',
    content: '<p>System settings and configuration options.</p>',
    iconName: 'settings',
  },
  {
    id: 'help',
    label: 'Help',
    content: '<p>Help documentation and support resources.</p>',
    iconName: 'help-circle',
  },
];

// Advanced tabs with all features
export const advancedTabs: TabItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    subtitle: 'Manage your work',
    content: '<p>View and manage all your active projects in one place.</p>',
    iconName: 'folder',
    badge: '12',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    subtitle: 'Track progress',
    content: '<p>Keep track of your tasks and deadlines efficiently.</p>',
    iconName: 'check-square',
    badge: '7',
    closeable: true,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    subtitle: 'Schedule events',
    content: '<p>Manage your schedule and upcoming events.</p>',
    iconName: 'calendar',
    closeable: true,
  },
  {
    id: 'messages',
    label: 'Messages',
    subtitle: 'Communication hub',
    content: '<p>Access your messages and team communications.</p>',
    iconName: 'message-circle',
    badge: '3',
    closeable: true,
  },
  {
    id: 'files',
    label: 'Files',
    subtitle: 'Document storage',
    content: '<p>Organize and access your files and documents.</p>',
    iconName: 'file-text',
    disabled: true,
  },
];

// Badges tabs
export const badgesTabs: TabItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    content: '<p>View and manage all your active projects in one place.</p>',
    badge: '12',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    content: '<p>Keep track of your tasks and deadlines efficiently.</p>',
    badge: '7',
    closeable: true,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    content: '<p>Manage your schedule and upcoming events.</p>',
    closeable: true,
  },
  {
    id: 'messages',
    label: 'Messages',
    content: '<p>Access your messages and team communications.</p>',
    badge: '3',
    closeable: true,
  },
  {
    id: 'files',
    label: 'Files',
    content: '<p>Organize and access your files and documents.</p>',
    disabled: true,
  },
];

// Many tabs for scrollable demo
export const manyTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Dashboard',
    content: '<p>Dashboard content</p>',
    iconName: 'layout',
  },
  {
    id: 'tab2',
    label: 'Analytics',
    content: '<p>Analytics content</p>',
    iconName: 'layout',
  },
  {
    id: 'tab3',
    label: 'Reports',
    content: '<p>Reports content</p>',
    iconName: 'file-text',
  },
  {
    id: 'tab4',
    label: 'Users',
    content: '<p>Users content</p>',
    iconName: 'users',
  },
  {
    id: 'tab5',
    label: 'Settings',
    content: '<p>Settings content</p>',
    iconName: 'settings',
  },
  {
    id: 'tab6',
    label: 'Billing',
    content: '<p>Billing content</p>',
    iconName: 'credit-card',
  },
  {
    id: 'tab7',
    label: 'Support',
    content: '<p>Support content</p>',
    iconName: 'help-circle',
  },
  {
    id: 'tab8',
    label: 'Documentation',
    content: '<p>Documentation content</p>',
    iconName: 'book',
  },
  {
    id: 'tab9',
    label: 'API',
    content: '<p>API content</p>',
    iconName: 'code',
  },
  {
    id: 'tab10',
    label: 'Integrations',
    content: '<p>Integrations content</p>',
    iconName: 'link',
  },
];

// Demo: Custom tab row wrapper and background styles
export const pillTabRowWrapperStyles = {
  borderRadius: '9999px',
  border: '2px solid #e0e7ef',
  padding: '0.25rem 0.5rem',
  boxShadow: '0 2px 8px 0 rgba(42, 123, 155, 0.08)',
};
export const pillTabRowBackgroundStyles = {
  background: 'linear-gradient(90deg, #e0f7fa 0%, #fce4ec 100%)',
  borderRadius: '9999px',
  boxShadow: '0 2px 8px 0 rgba(42, 123, 155, 0.08)',
};
export const coloredTabRowWrapperStyles = {
  borderRadius: '16px',
  border: '1px solid #e0e7ef',
  background: '#f3f4f6',
  padding: '0.5rem 1rem',
};
export const coloredTabRowBackgroundStyles = {
  background: 'rgba(233, 30, 99, 0.08)',
  borderRadius: '16px',
};

// Demo: Navigation-only tabs (no content panels)
export const navigationTabs: TabItem[] = [
  { id: 'nav-home', label: 'Home', iconName: 'home' },
  { id: 'nav-products', label: 'Products', iconName: 'package' },
  { id: 'nav-services', label: 'Services', iconName: 'briefcase' },
  { id: 'nav-about', label: 'About', iconName: 'info' },
  { id: 'nav-contact', label: 'Contact', iconName: 'phone' },
];
