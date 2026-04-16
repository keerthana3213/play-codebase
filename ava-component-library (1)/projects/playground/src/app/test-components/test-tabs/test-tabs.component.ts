import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem } from '@aava/play-core';
import { AavaTabsComponent, AavaTableComponent, AavaDrawerComponent, AavaColumnDefDirective, AavaHeaderCellDefDirective, AavaCellDefDirective, AavaHeaderRowDefDirective, AavaHeaderRowDirective, AavaRowDefDirective, AavaRowDirective } from '@aava/play-core';

@Component({
  selector: 'app-test-tabs',
  imports: [CommonModule, AavaTabsComponent, AavaTableComponent, AavaDrawerComponent, AavaColumnDefDirective, AavaHeaderCellDefDirective, AavaCellDefDirective, AavaHeaderRowDefDirective, AavaHeaderRowDirective, AavaRowDefDirective, AavaRowDirective],
  templateUrl: './test-tabs.component.html',
  styleUrl: './test-tabs.component.scss',
})
export class TestTabsComponent {
  
  constructor(private cdr: ChangeDetectorRef) {}
  tabItems: TabItem[] = [
    { id: 'tab1', label: 'Tab1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab3', content: 'Content 1' },
    { id: 'tab4', label: 'Tab4', content: 'Content 2' },
  ];
  tabItemsWithIcon: TabItem[] = [
    {
      id: 'tab1',
      label: 'Tab1',
      content: 'Content 1',
      iconName: 'circle-check',
    },
    {
      id: 'tab2',
      label: 'Tab2',
      content: 'Content 2',
      iconName: 'circle-check',
    },
    {
      id: 'tab3',
      label: 'Tab3',
      content: 'Content 1',
      iconName: 'circle-check',
    },
    {
      id: 'tab4',
      label: 'Tab4',
      content: 'Content 2',
      iconName: 'circle-check',
    },
  ];
  // Button variant tabs for xs,sm and md sizes
  tabItemsWithIcon_2: TabItem[] = [
    {
      id: 'tab1',
      label: 'Tab1',
      content: 'Content 1',
      iconName: 'chevron-right',
    },
    {
      id: 'tab2',
      label: 'Tab2',
      content: 'Content 2',
      iconName: 'chevron-right',
    },
    {
      id: 'tab3',
      label: 'Tab3',
      content: 'Content 1',
      iconName: 'chevron-right',
    },
    {
      id: 'tab4',
      label: 'Tab4',
      content: 'Content 2',
      iconName: 'chevron-right',
    },
  ];
  basicTabs: TabItem[] = [
    { id: 'tab1', label: 'Tab1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab3', content: 'Content 1' },
    { id: 'tab4', label: 'Tab4', content: 'Content 2' },
  ];
  basicTabs_2: TabItem[] = [
    {
      id: 'tab1',
      label: 'Tab1',
      content: 'Content 1',
      iconName: 'circle-check',
    },
    {
      id: 'tab2',
      label: 'Tab2',
      content: 'Content 2',
      iconName: 'circle-check',
    },
    {
      id: 'tab3',
      label: 'Tab3',
      content: 'Content 1',
      iconName: 'circle-check',
    },
    {
      id: 'tab4',
      label: 'Tab4',
      content: 'Content 2',
      iconName: 'circle-check',
    },
  ];
  basicTabs_3: TabItem[] = [
    {
      id: 'tab1',
      label: 'Tab1',
      content: 'Content 1',
      iconName: 'chevron-right',
    },
    {
      id: 'tab2',
      label: 'Tab2',
      content: 'Content 2',
      iconName: 'chevron-right',
    },
    {
      id: 'tab3',
      label: 'Tab3',
      content: 'Content 1',
      iconName: 'chevron-right',
    },
    {
      id: 'tab4',
      label: 'Tab4',
      content: 'Content 2',
      iconName: 'chevron-right',
    },
  ];
  basicTabs_4: TabItem[] = [
    { id: 'tab1', label: '', content: 'Content 1', iconName: 'circle-check' },
    { id: 'tab2', label: '', content: 'Content 2', iconName: 'circle-check' },
    { id: 'tab3', label: '', content: 'Content 1', iconName: 'circle-check' },
    { id: 'tab4', label: '', content: 'Content 2', iconName: 'circle-check' },
  ];
  basicTabs_5: TabItem[] = [
    { id: 'tab1', label: '', content: 'Content 1', iconName: 'chevron-right' },
    { id: 'tab2', label: '', content: 'Content 2', iconName: 'chevron-right' },
    { id: 'tab3', label: '', content: 'Content 1', iconName: 'chevron-right' },
    { id: 'tab4', label: '', content: 'Content 2', iconName: 'chevron-right' },
  ];
  iconOnlyTabs: TabItem[] = [
    { id: 'icon1', label: 'circle-check', iconName: 'circle-check', tooltip: { title: 'Circle Check', description: 'Everything is validated', position: 'top', type: 'simple' } },
    { id: 'icon2', label: 'circle-check', iconName: 'circle-check', tooltip: { title: 'Validation Info', description: 'Checked by system', position: 'bottom', type: 'card', icon: 'info' } },
    { id: 'icon3', label: 'circle-check', iconName: 'circle-check', tooltip: { title: 'Status Ok', description: 'Ready to proceed', position: 'left', icon: 'check' } },
    { id: 'icon4', label: 'circle-check', iconName: 'circle-check', tooltip: { title: 'Success', description: 'Task completed', position: 'right', icon: 'check-circle' } },
  ];
  iconOnlyTabs_2: TabItem[] = [
    { id: 'icon1', label: 'chevron-right', iconName: 'chevron-right' },
    { id: 'icon2', label: 'chevron-right', iconName: 'chevron-right' },
    { id: 'icon3', label: 'chevron-right', iconName: 'chevron-right' },
    { id: 'icon4', label: 'chevron-right', iconName: 'chevron-right' },
  ];
  activeTabId = 'tab1';

  customActiveButtonTabStyles = {
    background:
      'linear-gradient(135deg, rgba(233, 30, 99, 1) 0%, rgba(156, 39, 176, 1) 100%)',
  };

  activeTabIds = {
    basic: 'home',
    button: 'overview',
    icon: 'dashboard',
    advanced: 'projects',
    scrollable: 'tab1',
  };

  // Customizable Icon Tabs - each tab with different color
  customizableIconTabs: TabItem[] = [
    {
      id: 'agents',
      label: 'Agents',
      iconName: 'message-circle',
      color: '#0066FF',
      backgroundColor: '#E6F0FF',
      tooltip: { title: 'Agents List', description: 'Manage your AI agents here', icon: 'users', position: 'top' }
    },
    {
      id: 'chat',
      label: 'Chat',
      iconName: 'message-circle',
      color: '#00D4AA',
      backgroundColor: '#E6FFF9',
      tooltip: { title: 'Chat Support', description: 'Talk with our tech team', type: 'guided', icon: 'message-square' }
    },
    {
      id: 'settings',
      label: 'Settings',
      iconName: 'wrench',
      color: '#E91E99',
      backgroundColor: '#FFE6F5',
      tooltip: { title: 'System Settings', description: 'Configure application behavior', icon: 'settings', position: 'bottom' }
    },
    {
      id: 'documents',
      label: 'Documents',
      iconName: 'book-open',
      color: '#FF5733',
      backgroundColor: '#FFE8E6',
      tooltip: { title: 'Documentation', description: 'Read full specifications', icon: 'file-text', position: 'left' }
    },
    {
      id: 'security',
      label: 'Security',
      iconName: 'shield-check',
      color: '#00A86B',
      backgroundColor: '#E6F7F0',
      tooltip: { title: 'Security Audit', description: 'Check system vulnerabilities', icon: 'lock', position: 'top' }
    },
    {
      id: 'analytics',
      label: 'Analytics',
      iconName: 'message-circle',
      color: '#9333EA',
      backgroundColor: '#F3E6FF',
      tooltip: { title: 'Live Analytics', description: 'Real-time performance metrics', icon: 'bar-chart', position: 'right' }
    },
  ];

  // Active tab for customizable icon tabs
  customizableActiveTabId = 'agents';

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
      case 'customizable':
        this.customizableActiveTabId = tab.id;
        break;
    }
  }

  // Navigate to next tab in customizableIconTabs
  navigateToNextTab(): void {
    const currentIndex = this.customizableIconTabs.findIndex(
      tab => tab.id === this.customizableActiveTabId
    );
    const nextIndex = (currentIndex + 1) % this.customizableIconTabs.length;
    this.customizableActiveTabId = this.customizableIconTabs[nextIndex].id;
    console.log('Navigated to tab:', this.customizableIconTabs[nextIndex]);
  }

  // Table and Drawer functionality
  displayedColumns = ['name', 'email'];
  tableDataSource = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com' },
  ];

  // Drawer state
  isDrawerOpen = false;
  drawerActiveTabId = 'details';
  selectedUserData: any = null;

  // Drawer tabs - content will be updated dynamically
  drawerTabs: TabItem[] = [
    { id: 'details', label: 'Details', content: '' },
    { id: 'settings', label: 'Settings', content: '' },
  ];

  // Open drawer with specific tab based on field clicked
  openDrawerWithTab(field: string, rowData: any): void {
    console.log(`Clicked on ${field} field:`, rowData);
    console.log('Current drawer state before:', this.isDrawerOpen);
    
    // Store the selected user data
    this.selectedUserData = rowData;
    
    // Set active tab based on field clicked FIRST
    if (field === 'name') {
      this.drawerActiveTabId = 'details';
      console.log('Setting drawer tab to: details');
    } else if (field === 'email') {
      this.drawerActiveTabId = 'settings';
      console.log('Setting drawer tab to: settings');
    }
    
    // Then update tab content with user data
    this.updateTabContent();
    
    // Open the drawer
    this.isDrawerOpen = true;
    
    // Force immediate change detection
    this.cdr.detectChanges();
    
    console.log('Drawer state after opening:', this.isDrawerOpen);
    console.log('Active tab ID set to:', this.drawerActiveTabId);
  }

  // Close drawer
  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  // Handle drawer tab change
  onDrawerTabChange(tab: TabItem): void {
    this.drawerActiveTabId = tab.id;
    console.log('Drawer tab changed to:', tab);
    // Update content when tab changes
    this.updateTabContent();
    // Trigger change detection
    this.cdr.detectChanges();
  }

  // Update tab content based on selected user and active tab
  updateTabContent(): void {
    if (!this.selectedUserData) return;
    
    // Create completely new array to ensure change detection
    this.drawerTabs = [
      {
        id: 'details',
        label: 'Details',
        content: `
          <div style="padding: 20px;">
            <h4>User Details</h4>
            <p><strong>Name:</strong> ${this.selectedUserData.name}</p>
            <p><strong>Email:</strong> ${this.selectedUserData.email}</p>
            <p><strong>ID:</strong> ${this.selectedUserData.id}</p>
            <p>This tab shows detailed information about the selected user.</p>
          </div>
        `
      },
      {
        id: 'settings',
        label: 'Settings',
        content: `
          <div style="padding: 20px;">
            <h4>User Settings</h4>
            <p><strong>User:</strong> ${this.selectedUserData.name}</p>
            <p><strong>Email:</strong> ${this.selectedUserData.email}</p>
            <p>Configure settings and preferences for this user.</p>
            <div style="margin-top: 15px;">
              <label style="display: block; margin-bottom: 5px;">Notifications:</label>
              <input type="checkbox" checked> Email notifications<br>
              <input type="checkbox"> SMS notifications<br>
            </div>
          </div>
        `
      }
    ];
    
    console.log('Updated tab content for user:', this.selectedUserData.name);
    console.log('Active tab:', this.drawerActiveTabId);
    console.log('Tabs array:', this.drawerTabs);
  }

  // Simple test method
  testMethod(): void {
    console.log('Test method called!');
    alert('Test method works!');
  }

  // Console log method for template
  console = console;

  // Force tab selection for testing
  forceSelectTab(tabId: string): void {
    console.log('Forcing tab selection to:', tabId);
    this.drawerActiveTabId = tabId;
    this.cdr.detectChanges();
    console.log('After forcing tab selection:', this.drawerActiveTabId);
  }
}
