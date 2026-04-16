import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-search-bar-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent],
  templateUrl:'./sizes-demo.component.html',
  styleUrl:'./sizes-demo.component.scss'
})
export class SizesDemoComponent {
  onSearch(searchTerm: string, size: string) {
    console.log(`Search clicked with size ${size}:`, searchTerm);
  }

  onTextboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Textbox changed:', target.value);
  }
}
