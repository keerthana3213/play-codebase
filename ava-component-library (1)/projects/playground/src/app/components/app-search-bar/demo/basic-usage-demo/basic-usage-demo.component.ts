import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-search-bar-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl:'./basic-usage-demo.component.scss' 
})
export class BasicUsageDemoComponent {

  onSearchClick(searchTerm: string) {
    console.log('Search clicked with term:', searchTerm);
  }

  onSearchChange(searchTerm: string) {
    console.log('Textbox changed:', searchTerm);
  }
  onClose(searchTerm: string) {
    console.log('Clear search:', searchTerm);
  }
}
