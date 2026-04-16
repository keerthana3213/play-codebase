import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AavaAvatarsComponent,
  AavaHeaderComponent,
  AavaIconComponent,
  AavaTabsComponent,
  TabItem,
} from '@aava/play-core';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-mobile-view',
  imports: [
    CommonModule,
    AavaIconComponent,
    AavaHeaderComponent,
    AavaAvatarsComponent,
    AavaTabsComponent,
    FormsModule,
  ],
  templateUrl: './mobile-view.component.html',
  styleUrl: './mobile-view.component.scss',
})
export class MobileViewComponent {
  isMenuOpen = false;
  logoUrl: string = 'assets/asc-logo.png';
  searchText = '';
  isDropdownOpen = true;
  activeTabId: string = 'overview';
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

  get getIconColor(): string {
    return '#000';
  }

  get iconsTabs(): TabItem[] {
    return this.baseIconsTabs.map((tab) => ({
      ...tab,
      active: tab.id === this.activeTabId,
    }));
  }

  onSearchChange() {
    console.log('Search text changed:', this.searchText);
  }

  toggleMenuDropdown() {
    this.isMenuOpen = !this.isMenuOpen;
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

  onTabChange(event: any) {
    this.activeTabId = event.id;
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
