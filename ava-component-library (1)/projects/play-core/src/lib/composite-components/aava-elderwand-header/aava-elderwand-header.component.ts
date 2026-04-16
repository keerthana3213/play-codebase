import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AavaHeaderComponent, AavaAvatarsComponent } from '../../../public-api';

@Component({
  selector: 'aava-elderwand-header',
  imports: [AavaHeaderComponent, AavaAvatarsComponent],
  templateUrl: './aava-elderwand-header.component.html',
  styleUrl: './aava-elderwand-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AavaElderwandHeaderComponent {}
