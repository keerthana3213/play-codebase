import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent } from '@aava/play-core';

@Component({
  selector: 'aava-search-bar-icons-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent],
  templateUrl:'./icons-demo.component.html',
  styleUrl:'./icons-demo.component.scss'
})
export class IconsDemoComponent {
  onSearch(searchTerm: string, variant: string) {
    console.log(`Search clicked with variant ${variant}:`, searchTerm);
  }

  onTextboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Textbox changed:', target.value);
  }
}
