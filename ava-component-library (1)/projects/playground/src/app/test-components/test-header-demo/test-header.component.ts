import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-header-demo',
  imports: [CommonModule, FormsModule, AavaButtonComponent],
  templateUrl: './test-header.component.html',
  styleUrl: './test-header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TestHeaderDemoComponent {
  onButtonClick(event: Event) {
    window.open(
      'https://gentle-wave-0b254850f.4.azurestaticapps.net/test-header',
      '_blank',
      'noopener,noreferrer'
    );
    console.log('Button clicked:', event);
  }
}
