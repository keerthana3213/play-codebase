import { ChangeDetectionStrategy, Component } from '@angular/core';
 
@Component({
  selector: 'aava-card-actions',
  imports: [],
  templateUrl: './aava-card-actions.component.html',
  styleUrl: './aava-card-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaCardActionsComponent {
  cardClick: any;
 
}
 