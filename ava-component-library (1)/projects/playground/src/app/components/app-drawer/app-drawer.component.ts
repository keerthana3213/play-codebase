import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
  AavaTextboxComponent,
  AavaAvatarsComponent,
  AavaBadgesComponent,
  AavaCheckboxComponent,
} from '@aava/play-core';
import { AgentDetailsDemoComponent } from './demo/agent-details-demo.component';

interface DrawerDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaDrawerComponent,
    AavaButtonComponent,
    AavaCheckboxComponent,
    AavaTextboxComponent,
    AavaBadgesComponent,
    AavaAvatarsComponent,
    AgentDetailsDemoComponent,
  ],
  templateUrl: './app-drawer.component.html',
  styleUrls: ['./app-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDrawerComponent {
  // Demo navigation data
  demos = [
    {
      path: 'basic-usage',
      title: 'Basic Usage',
      description: 'Simple drawer with default right position and medium size',
    },
    {
      path: 'positions',
      title: 'Positions',
      description:
        'Drawers can slide in from any side: left, right, top, or bottom',
    },
    {
      path: 'sizes',
      title: 'Sizes',
      description:
        'Available sizes: small, medium, large, extra-large, and full',
    },
    {
      path: 'behavior',
      title: 'Behavior Options',
      description: 'Customize drawer behavior with various interaction options',
    },
    {
      path: 'content',
      title: 'Content Structure',
      description:
        'Organize drawer content with header, body, and footer sections',
    },
    {
      path: 'resizable',
      title: 'Resizable Drawer',
      description:
        'Enable resizing functionality for adjustable drawer dimensions',
    },
  ];

  // Documentation Sections
  sections: DrawerDocSection[] = [
    {
      title: 'Positions',
      description:
        'Drawers can slide in from any side: left, right, top, or bottom.',
      showCode: false,
    },
    {
      title: 'Sizes',
      description:
        'Available sizes: small, medium, large, extra-large, and full.',
      showCode: false,
    },

    {
      title: 'Spring Animation',
      description:
        'Smart animate spring with Mass: 1, Stiffness: 711.1, Damping: 40 for bouncy, dynamic transitions.',
      showCode: false,
    },
    {
      title: 'Behavior Properties',
      description:
        'Control drawer behavior with input properties: overlay, persistence, animations, and more.',
      showCode: false,
    },
    {
      title: 'Trigger Examples',
      description:
        'Drawers can be triggered by any element: buttons, links, icons, images, text, etc.',
      showCode: false,
    },
    {
      title: 'Customization Examples',
      description: 'Customize drawer appearance with closeIconSize, body padding, and header-less drawers.',
      showCode: false,
    },
    {
      title: 'Real-world Examples',
      description: 'Practical examples inspired by modern UI patterns.',
      showCode: false,
    },
  ];

  // Drawer States

  // Position drawers
  leftDrawerOpen = false;
  rightDrawerOpen = false;
  topDrawerOpen = false;
  bottomDrawerOpen = false;

  // Size drawers
  smallDrawerOpen = false;
  mediumDrawerOpen = false;
  largeDrawerOpen = false;
  extraLargeDrawerOpen = false;
  fullDrawerOpen = false;

  // Spring animation drawers
  springRightDrawerOpen = false;
  springLeftDrawerOpen = false;
  springTopDrawerOpen = false;
  springBottomDrawerOpen = false;

  // No animation drawer
  noAnimationDrawerOpen = false;

  // Behavior property examples
  showOverlayTrueDrawer = false;
  showOverlayFalseDrawer = false;
  closeOnOverlayTrueDrawer = false;
  closeOnOverlayFalseDrawer = false;
  closeOnEscapeTrueDrawer = false;
  closeOnEscapeFalseDrawer = false;
  showCloseButtonTrueDrawer = false;
  showCloseButtonFalseDrawer = false;
  persistentTrueDrawer = false;
  persistentFalseDrawer = false;
  animateTrueDrawer = false;
  animateFalseDrawer = false;

  // Additional variables that HTML is expecting
  overlayTrueDrawerOpen = false;
  overlayFalseDrawerOpen = false;
  overlayClickTrueDrawerOpen = false;
  overlayClickFalseDrawerOpen = false;
  escapeTrueDrawerOpen = false;
  escapeFalseDrawerOpen = false;
  closeButtonTrueDrawerOpen = false;
  closeButtonFalseDrawerOpen = false;
  persistentFalseDrawerOpen = false;
  persistentTrueDrawerOpen = false;
  animateTrueDrawerOpen = false;
  animateFalseDrawerOpen = false;

  // Trigger examples
  buttonTriggerDrawerOpen = false;
  linkTriggerDrawerOpen = false;
  iconTriggerDrawerOpen = false;
  imageTriggerDrawerOpen = false;
  textTriggerDrawerOpen = false;
  cardTriggerDrawerOpen = false;

  // Customization examples
  closeIconSizeDrawerOpen = false;
  bodyPaddingDrawerOpen = false;
  noHeaderRightDrawerOpen = false;
  noHeaderLeftDrawerOpen = false;
  noHeaderTopDrawerOpen = false;
  noHeaderBottomDrawerOpen = false;

  // Custom styles objects
  headerCustomStyles = { '--drawer-header-border': 'none', '--drawer-header-padding': '8px' };
  bodyPaddingStyles = { '--drawer-body-padding': '30px', '--drawer-body-vertical-padding': '30px' };
  closeButtonPaddingStyles = { '--drawer-show-close-button-padding': '16px' };

  // Real-world example drawers
  userProfileDrawerOpen = false;
  settingsDrawerOpen = false;
  notificationsDrawerOpen = false;
  candidateDetailsDrawerOpen = false;

  // Sample data for examples
  notifications = [
    { id: 1, title: 'New message from John', time: '2 min ago', read: false },
    {
      id: 2,
      title: 'Project deadline reminder',
      time: '1 hour ago',
      read: false,
    },
    { id: 3, title: 'Weekly report ready', time: '3 hours ago', read: true },
    {
      id: 4,
      title: 'Team meeting in 30 minutes',
      time: '5 hours ago',
      read: true,
    },
  ];

  candidateData = {
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    experience: '5+ years',
    location: 'San Francisco, CA',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    skills: ['React', 'TypeScript', 'Angular', 'Vue.js', 'Node.js'],
    status: 'Under Review',
    appliedDate: '2024-01-15',
    rating: 4.5,
  };

  /**
   * Toggle code visibility for a section
   */
  toggleCode(section: DrawerDocSection): void {
    section.showCode = !section.showCode;
  }

  /**
   * Get example code for a section
   */
  getExampleCode(section: string): string {
    return `<!-- Example code for ${section} -->
<aava-drawer [isOpen]="drawerOpen" title="${section} Example">
  <p>Content for ${section}</p>
</aava-drawer>`;
  }

  /**
   * Handle drawer events
   */
  onDrawerOpened(): void {
    console.log('Drawer opened');
  }

  onDrawerClosed(): void {
    console.log('Drawer closed');
  }

  onOverlayClick(): void {
    console.log('Overlay clicked');
  }

  onEscapePressed(): void {
    console.log('Escape key pressed');
  }

  /**
   * Mark notification as read
   */
  markAsRead(notification: any): void {
    notification.read = true;
  }

  /**
   * Clear all notifications
   */
  clearAllNotifications(): void {
    this.notifications = [];
  }

  /**
   * Get unread notifications count
   */
  get unreadNotificationsCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  /**
   * Get notifications subtitle
   */
  get notificationsSubtitle(): string {
    return `You have ${this.unreadNotificationsCount} unread notifications`;
  }

  // Agent Demo Drawer
  agentDemoDrawerOpen = false;

  /**
   * Handle tag click in agent demo
   */
  onTagClick(tagName: string): void {
    console.log(`Agent tag clicked: ${tagName}`);
    // You can add more functionality here like filtering, navigation, etc.
  }

  /**
   * Handle stat navigation in agent demo
   */
  onStatNavigation(statType: string, direction: 'prev' | 'next'): void {
    console.log(`Stat navigation: ${statType} ${direction}`);
    // You can add functionality to cycle through different categories, developers, etc.
  }

  /**
   * Handle agent action button click
   */
  onAgentAction(): void {
    console.log('Agent action button clicked');
    // You can add functionality like "Use Agent", "Add to Favorites", etc.
  }
}
