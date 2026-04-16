import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaBadgeDirective } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-badge-directive',
  imports: [CommonModule, AavaBadgeDirective, AavaButtonComponent, AavaIconComponent],
  templateUrl: './test-badge-directive.component.html',
  standalone: true
})
export class TestBadgeDirectiveComponent {
  badgeHidden = false;
  cartItems = 3;
  newMessages = 7;

  // Properties for hidden badge examples
  hiddenBadgeVisible = false;
  clickableBadgeVisible = true;

  toggleBadgeVisibility() {
    this.badgeHidden = !this.badgeHidden;
  }

  toggleHiddenBadge() {
    this.hiddenBadgeVisible = !this.hiddenBadgeVisible;
  }

  toggleClickableBadge() {
    this.clickableBadgeVisible = !this.clickableBadgeVisible;
  }
}
