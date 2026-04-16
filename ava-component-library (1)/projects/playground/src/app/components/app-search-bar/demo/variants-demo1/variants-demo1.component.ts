import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent } from '@aava/play-core';

@Component({
  selector: 'ava-search-bar-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent],
  templateUrl:'./variants-demo1.component.html',
  styleUrl:'./variants-demo1.component.scss'

})
export class VariantsDemo1Component {
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
