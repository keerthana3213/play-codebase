import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';
import { AavaDefaultCardComponent } from '@aava/play-core';
import { AavaCardHeaderComponent } from '@aava/play-core';
import { AavaCardContentComponent } from '@aava/play-core';
import { AavaCardFooterComponent } from '@aava/play-core';
import { AavaTagComponent } from '@aava/play-core';

@Component({
  selector: 'ava-card-basic-usage-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaIconComponent,
    AavaDefaultCardComponent,
    AavaCardHeaderComponent,
    AavaCardContentComponent,
    AavaCardFooterComponent,
    AavaTagComponent,
  ],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class BasicUsageDemoComponent {
  cardTitle = 'Basic Card Title';
  cardContent =
    'This is a simple card with basic content. It demonstrates the fundamental layout and styling of the card component.';

  onCardClick() {
    console.log('Card clicked!');
  }

  onActionClick(action: string) {
    console.log(`${action} clicked!`);
  }
}
