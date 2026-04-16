import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

interface Tag {
  id: number;
  label: string;
}

@Component({
  selector: 'ava-tags-interactive',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './tags-interactive.component.html',
  styleUrls: ['./tags-interactive.component.scss'],
})
export class TagsInteractiveComponent {
  tags: Tag[] = [
    { id: 1, label: 'JavaScript' },
    { id: 2, label: 'Angular' },
    { id: 3, label: 'TypeScript' },
    { id: 4, label: 'CSS' },
    { id: 5, label: 'HTML' },
  ];

  onTagClick(tagName: string): void {
    console.log(`${tagName} tag clicked!`);
  }

  onTagRemove(tagToRemove: Tag): void {
    this.tags = this.tags.filter((tag) => tag.id !== tagToRemove.id);
    console.log(`${tagToRemove.label} tag removed!`);
  }

  trackByTag(index: number, tag: Tag): number {
    return tag.id;
  }
}
