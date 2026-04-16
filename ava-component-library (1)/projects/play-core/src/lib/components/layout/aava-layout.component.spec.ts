import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

@Component({
  selector: 'aava-layout',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-layout.component.html',
  styleUrl: './aava-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaLayoutComponent {
  @Input() headerHeight = '100px';
  @Input() leftPanelWidth = '100px';
  @Input() rightPanelWidth = '300px';
  @Input() footerHeight = '60px';
  @Input() footerText = '';
  @Input() footerMode: 'sticky' | 'scrollable' = 'sticky';
  @Input() showHeader = true;
  @Input() showLeftPanel = true;
  @Input() showRightPanel = true;
  @Input() showFooter = true;
  @Input() leftPanelOpen = false;
  @Input() rightPanelOpen = false;

  // Custom icon names for toggle buttons
  @Input() leftPanelOpenIcon = 'panel-right-close';
  @Input() leftPanelClosedIcon = 'panel-right-open';
  @Input() rightPanelOpenIcon = 'panel-right-open';
  @Input() rightPanelClosedIcon = 'panel-right-close';

  @Output() leftPanelOpenChange = new EventEmitter<boolean>();
  @Output() rightPanelOpenChange = new EventEmitter<boolean>();

  toggleLeftPanel(): void {
    this.leftPanelOpen = !this.leftPanelOpen;
    this.leftPanelOpenChange.emit(this.leftPanelOpen);
  }

  toggleRightPanel(): void {
    this.rightPanelOpen = !this.rightPanelOpen;
    this.rightPanelOpenChange.emit(this.rightPanelOpen);
  }
}
