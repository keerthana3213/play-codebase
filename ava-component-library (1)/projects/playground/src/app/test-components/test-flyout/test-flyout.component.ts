import { Component, QueryList, ViewChildren } from '@angular/core';
import { AavaButtonComponent } from '@aava/play-core'
import { CommonModule } from '@angular/common';
import { AavaFlyoutComponent } from '../../../../../play-core/src/public-api';

@Component({
  selector: 'app-test-flyout',
  imports: [CommonModule,AavaButtonComponent, AavaFlyoutComponent],
  templateUrl: './test-flyout.component.html',
  styleUrl: './test-flyout.component.scss',
})
export class TestFlyoutComponent { 

  flyoutList = [
    { label: 'Flyout 1', content: 'This is content for Flyout 1. Scroll down to see more flyouts.' },
    { label: 'Flyout 2', content: 'This is content for Flyout 2. Testing scroll behavior with multiple flyouts.' },
    { label: 'Flyout 3', content: 'This is content for Flyout 3. Each flyout should position correctly relative to its trigger.' },
    { label: 'Flyout 4', content: 'This is content for Flyout 4. Scroll testing continues...' },
    { label: 'Flyout 5', content: 'This is content for Flyout 5. More flyouts to test scroll positioning.' },
    { label: 'Flyout 6', content: 'This is content for Flyout 6. Ensuring flyouts work well when page is scrolled.' },
    { label: 'Flyout 7', content: 'This is content for Flyout 7. Testing boundary adjustments and alignment.' },
    { label: 'Flyout 8', content: 'This is content for Flyout 8. Nearly at the bottom of the list.' },
    { label: 'Flyout 9', content: 'This is content for Flyout 9. Almost done with scroll testing.' },
    { label: 'Flyout 10', content: 'This is content for Flyout 10. Last flyout in the scroll test list.' },
    { label: 'Flyout 11', content: 'This is content for Flyout 11. Extra flyout for comprehensive testing.' },
    { label: 'Flyout 12', content: 'This is content for Flyout 12. Final flyout to ensure scroll behavior works correctly.' }
  ];

  // Get all flyout component references
  @ViewChildren('flyout') flyouts!: QueryList<any>;

  // Optional: method for debugging or manually closing all flyouts
  closeAllFlyouts() {
    this.flyouts.forEach(f => f.close());
  }
}
