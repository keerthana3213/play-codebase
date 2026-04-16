import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'aava-approval-card',
  imports: [CommonModule,],
  templateUrl: './aava-approval-card.component.html',
  styleUrls: ['./aava-approval-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaApprovalCardComponent {
  @Input() height: string = '250px'; // Updated default height
  @Input() background: string = '';
}
