import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-default-card',
  imports: [CommonModule],
  templateUrl: './aava-default-card.component.html',
  styleUrl: './aava-default-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaDefaultCardComponent {
  @Input() id = '';
  @Input() customStyles: Record<string, string> = {};
   @Input() cardStyles: Record<string, string> = {};
  get computedStyles(): Record<string, string> {
    return {
      ...this.customStyles
    };
  }
}
