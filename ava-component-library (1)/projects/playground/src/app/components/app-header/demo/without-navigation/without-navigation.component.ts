import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AavaAvatarsComponent,
  AavaHeaderComponent,
  AavaIconComponent,
} from '@aava/play-core';

@Component({
  selector: 'app-without-navigation',
  imports: [
    AavaHeaderComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    FormsModule,
  ],
  templateUrl: './without-navigation.component.html',
  styleUrl: './without-navigation.component.scss',
})
export class WithoutNavigationComponent {
  logoUrl: string = 'assets/asc-logo.png';
  searchText = '';

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

  get getIconColor(): string {
    return '#000';
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
