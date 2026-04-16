import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-tags',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './test-tags.component.html',
  styleUrls: ['./test-tags.component.scss']
})
export class TestTagsComponent {
  onTagClick() {
    console.log('Tag clicked');
  }
}
