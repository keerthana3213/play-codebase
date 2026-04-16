import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tags-variants',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-variants.component.html',
  styleUrls: ['./tags-variants.component.scss'],
})
export class TagsVariantsComponent {
  onTagClick(tagName: string): void {
    console.log(`${tagName} tag clicked!`);
  }
}
