import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';
@Component({
  selector: 'aava-txt-card',
  imports: [AavaDefaultCardComponent],
  templateUrl: './aava-txt-card.component.html',
  styleUrl: './aava-txt-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaTxtCardComponent {
  @Output() cardClick = new EventEmitter<void>();


  onCardClick() {
    this.cardClick.emit();
  }
}
