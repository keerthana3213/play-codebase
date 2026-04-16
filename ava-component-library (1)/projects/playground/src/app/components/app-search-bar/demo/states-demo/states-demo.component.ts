import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-search-bar-states-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent],
  templateUrl:'./states-demo.component.html',
  styleUrl:'./states-demo.component.scss'
})
export class StatesDemoComponent {
  isDisabled = false;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  onSearch(searchTerm: string, state: string) {
    console.log(`Search clicked in ${state} state:`, searchTerm);
  }

  onTextboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Textbox changed:', target.value);
  }
}
