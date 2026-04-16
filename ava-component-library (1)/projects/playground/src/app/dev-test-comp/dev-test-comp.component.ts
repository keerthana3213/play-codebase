import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../../play-core/src/lib/components/card/default-card/aava-default-card.component';
import { AavaFlyoutComponent } from '../../../../play-core/src/lib/components/flyout/aava-flyout.component';
import { AavaButtonComponent } from '../../../../play-core/src/lib/components/button/aava-button.component';
import { AavaIconComponent } from '../../../../play-core/src/lib/components/icon/aava-icon.component';

@Component({
  selector: 'app-dev-test-comp',
  standalone: true,
  imports: [
    CommonModule,
    AavaDefaultCardComponent,
    AavaFlyoutComponent,
    AavaButtonComponent,
    AavaIconComponent

  ],
  templateUrl: './dev-test-comp.component.html',
  styleUrl: './dev-test-comp.component.scss'
})
export class DevTestCompComponent {
  onDelete() {
    console.log('Delete clicked');
    // Add your delete logic here
  }

  onEdit() {
    console.log('Edit clicked');
    // Add your edit logic here
  }

  onView() {
    console.log('View clicked');
    // Add your view logic here
  }
  getTriggerElement(event: Event, fallback: HTMLElement | null): HTMLElement | null {
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
      const parentDiv = target.closest('div');
      return (parentDiv as HTMLElement) || fallback;
    }
    return fallback;
  }
}
