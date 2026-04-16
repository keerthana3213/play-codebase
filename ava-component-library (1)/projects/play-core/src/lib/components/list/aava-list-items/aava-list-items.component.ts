
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'aava-list-items',
  imports: [CommonModule],
  templateUrl: './aava-list-items.component.html',
  styleUrl: './aava-list-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class AavaListItemsComponent {

  @Input() selected = false;
  @Input() disabled = false;
  @Input() outline = false;
  @Input() hoverBg = false;
  @Input() hoverBorder = false;

  @Output() itemClick = new EventEmitter<void>();
  @Input() customStyles: Record<string, string> = {};

  onClick() {
    if (!this.disabled) {
      this.itemClick.emit();
    }
  }

}
