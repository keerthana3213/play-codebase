import { Component } from '@angular/core';
import {
  AavaAvatarsComponent,
  AavaHeaderComponent,
  AavaIconComponent,
  AavaTabsComponent,
  TabItem,
} from '@aava/play-core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-basic',
  imports: [
    CommonModule,
    AavaHeaderComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaTabsComponent,
    FormsModule,
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent {
  activeTabId: string = 'overview';
  searchText = '';
  logoUrl: string = 'assets/asc-logo.png';

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

  get iconsTabs(): TabItem[] {
    return this.baseIconsTabs.map((tab) => ({
      ...tab,
      active: tab.id === this.activeTabId,
    }));
  }

  get getIconColor(): string {
    return '#000';
  }

  onTabChange(event: any) {
    this.activeTabId = event.id;
  }

  onSearchChange() {
    console.log('Search text changed:', this.searchText);
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

  getLoggedInUserLogo(): string {
    const loggedInAccount = this.accounts.find((account) => account.isLoggedIn);
    return loggedInAccount ? loggedInAccount.userLogo : 'assets/1.svg';
  }
}
