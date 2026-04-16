import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  AavaAvatarsComponent,
  AavaHeaderComponent,
  AavaIconComponent,
  AavaTabsComponent,
  TabItem,
} from '@aava/play-core';
interface HeaderDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface DemoTabItem extends TabItem {
  url?: string;
  dropdown?: boolean;
  dropdownOpen?: boolean;
  dropdownOptions?: Array<{
    label: string;
    url: string;
    iconName?: string;
    sublabel?: string;
  }>;
}

@Component({
  selector: 'app-app-header',
  imports: [
    CommonModule,
    AavaHeaderComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaTabsComponent,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppHeaderComponent {
  iconColor: string = 'white';
  logoUrl: string = 'assets/asc-logo.png';
  isMenuOpen = false;
  sections: HeaderDocSection[] = [
    {
      title: 'Light Theme Header',
      description: 'Header with light theme.',
      showCode: false,
    },
    {
      title: 'Dark Theme Header',
      description: 'Header with dark theme.',
      showCode: false,
    },
    {
      title: 'Transparent Theme Header',
      description: 'Header with transparent theme.',
      showCode: false,
    },
    {
      title: 'Transparent Theme Header-2',
      description:
        'Responsive header with transparent theme, including logo, navigation tabs, and user icons.',
      showCode: false,
    },
  ];

  apiProps: ApiProperty[] = [
    {
      name: 'theme',
      type: "'light' | 'dark' | 'transparent'",
      default: "'light'",
      description: 'The theme of the header.',
    },
    {
      name: 'containerClass',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes for the header container.',
    },
  ];

  /** ---- Tabs with activeTabId handling ---- */
  activeTabId: string = 'overview';

  private baseIconsTabs: DemoTabItem[] = [
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
      content: 'Content 3',
      iconName: 'chevron-right',
    },
    {
      id: 'tab4',
      label: 'Tab4',
      content: 'Content 4',
      iconName: 'chevron-right',
    },
  ];

  /** Derived tabs array passed to ava-tabs */
  get iconsTabs(): TabItem[] {
    return this.baseIconsTabs.map((tab) => ({
      ...tab,
      active: tab.id === this.activeTabId,
    }));
  }

  toggleMenuDropdown() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onTabChange(event: any) {
    this.activeTabId = event.id;
  }

  onUrlChange(url: string) {
    console.log('URL changed:', url);
  }

  /** ---- Docs/demo helpers ---- */
  handleIconClick(): void {
    console.log('Icon clicked');
  }
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getExampleCode(section: string): string {
    return `<!-- example omitted -->`;
  }

  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => console.log('Code copied'));
  }

  searchText = '';
  onSearchChange() {
    console.log('Search text changed:', this.searchText);
  }

  /** ---- Accounts dropdown ---- */
  isDropdownOpen = true;
  accounts = [
    {
      companyName: 'ASCENDION',
      email: 'Jhon.Stark@Ascendion.com',
      companyLogo: 'assets/logos/dlogo.svg',
      userLogo: 'assets/1.svg',
      isLoggedIn: true,
    },
    {
      companyName: 'Axos',
      email: 'Akash.Kumar@Axos.com',
      companyLogo: 'assets/logos/dlogo.svg',
      userLogo: 'assets/1.svg',
      isLoggedIn: false,
    },
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  login(account: any) {
    this.accounts.forEach((acc) => (acc.isLoggedIn = false));
    account.isLoggedIn = true;
    this.isDropdownOpen = false;
  }
  get getIconColor(): string {
    return '#000';
  }

  onDayLightModeIconClick() {
    console.log('Day Light Mode Icon Clicked');
  }
  onTranslateIconClick() {
    console.log('Translate Icon Clicked');
  }
  onGraphIconClick() {
    console.log('Graph Icon Clicked');
  }

  getSortedAccounts() {
    return this.accounts.sort((a, b) =>
      a.isLoggedIn === b.isLoggedIn ? 0 : a.isLoggedIn ? -1 : 1
    );
  }

  getLoggedInUserLogo(): string {
    const loggedInAccount = this.accounts.find((account) => account.isLoggedIn);
    return loggedInAccount ? loggedInAccount.userLogo : 'assets/1.svg';
  }
}
