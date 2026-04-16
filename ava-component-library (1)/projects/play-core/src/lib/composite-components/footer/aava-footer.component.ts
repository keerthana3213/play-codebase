import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'aava-footer',
  imports: [],
  templateUrl: './aava-footer.component.html',
  styleUrl: './aava-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaFooterComponent {
  @Input() background: string = '';

}
