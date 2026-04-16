import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icons-sizes',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './icons-sizes.component.html',
  styleUrls: ['./icons-sizes.component.scss'],
})
export class IconsSizesComponent {
  // Size examples with different options
  sizeExamples = [
    { size: 16, label: 'Small (16px)' },
    { size: 20, label: 'Medium (24px)' },
    { size: 24, label: 'Large (32px)' },
    { size: 32, label: 'Extra Large (48px)' },
  ];

  iconName = 'heart'; // Using same icon to show size differences

  onIconClick(event: Event): void {
    console.log('Icon clicked:', event);
  }
}
