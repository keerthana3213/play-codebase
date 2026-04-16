import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaCardComponent } from "../../components/card/aava-card.component";

@Component({
  selector: 'aava-text-card',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaCardComponent],
  templateUrl: './aava-text-card.component.html',
  styleUrls: ['./aava-text-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaTextCardComponent {
  @Input() iconName = 'trending-up';
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() description: string = '';
  @Input() width = 0;
  @Input() type: 'default' | 'create' | 'prompt' = 'default';
  @Input() iconColor: string = ''
  @Input() userCount: number = 0;
  @Input() promptName: string = '';
  @Input() name: string = '';
  @Input() date: string = ''
  @Input() iconList: any = []
  @Output() cardClick = new EventEmitter<void>();
  @Output() iconClick = new EventEmitter<void>();
  @Input() headerIcons: { iconName: string; title: string, iconColor?: string }[] = [];
  @Input() footerIcons: { iconName: string; title: string, iconColor?: string }[] = [];
  @Input() isLoading: boolean = false;
  @Input() skeletonAnimationColor: string = "";
  @Input() skeletonBackground: string = "";


  onCardClick() {
    this.cardClick.emit();
  }

  iconClicked(icon: any) {
    this.iconClick.emit(icon);
  }
}
