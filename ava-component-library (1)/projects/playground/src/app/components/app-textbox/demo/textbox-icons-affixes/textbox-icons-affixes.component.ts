import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-icons-affixes',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent, AavaIconComponent],
  templateUrl: './textbox-icons-affixes.component.html',
  styleUrls: ['./textbox-icons-affixes.component.scss'],
})
export class TextboxIconsAffixesComponent {
  searchValue = '';
  currencyValue = '';
  emailWithIconValue = '';
  percentageValue = '';
  passwordValue = '';
  showPassword = false;

  clearSearch(): void {
    this.searchValue = '';
    console.log('Search cleared');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Search value changed:', target.value);
  }

  onCurrencyChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Currency value changed:', target.value);
  }

  onEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Email value changed:', target.value);
  }

  onPercentageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Percentage value changed:', target.value);
  }
}
