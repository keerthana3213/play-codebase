import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'aava-card',
  imports: [CommonModule],
  templateUrl: './aava-card.component.html',
  styleUrl: './aava-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaCardComponent {

  @Input() heading = '';
  @Input() content = '';
  @Input() id = '';

}

