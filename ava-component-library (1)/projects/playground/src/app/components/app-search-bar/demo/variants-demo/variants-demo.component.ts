import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent } from '@aava/play-core';

@Component({
  selector: 'ava-search-bar-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent],
  templateUrl:'./variants-demo.component.html',
  styleUrl:'./variants-demo.component.scss'

})
export class VariantsDemoComponent {
  onSearch(searchTerm: string, variant: string) {
    console.log(`Search clicked with variant ${variant}:`, searchTerm);
  }

  onTextboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Textbox changed:', target.value);
  }
}
