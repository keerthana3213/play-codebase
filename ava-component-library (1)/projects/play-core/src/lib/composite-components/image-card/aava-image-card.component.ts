import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';
import { AavaTagComponent } from '../../components/tags/aava-tags.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaAvatarsComponent } from '../../components/avatars/aava-avatars.component';
import { AavaDividersComponent } from '../../components/dividers/aava-dividers.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';

export interface ImageCardTag {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom';
  shape?: 'pill' | 'square';
}

export interface ImageCardAvatar {
  url: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  text: string;
}

export interface ImageCardSubText {
  icon: {
    name: string;
    size?: number;
    color?: string;
  };
  text: string;
}

export interface ImageCardDivider {
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: string;
}

export interface ImageCardSubDescription {
  left: string;
  right: string;
}

export interface ImageCardButton {
  text: string;
  action?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'emerald';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string;
  height?: string;
}

export interface ImageCardLayout {
  orientation: 'vertical' | 'horizontal';
  imageGrid: 'top' | 'bottom' | 'left' | 'right';
  infoGrid: 'top' | 'bottom' | 'left' | 'right';
}

export interface ImageCardData {
  variant: 'withActions' | 'withoutActions';
  type?: 'simple' | 'default'; // Add this line
  title: string;
  image: string;
  divider?: ImageCardDivider;
  avatar?: ImageCardAvatar;
  subText?: ImageCardSubText;
  tags?: ImageCardTag[];
  subDescription?: ImageCardSubDescription;
  description?: string;
  buttons?: ImageCardButton[];
  layout: ImageCardLayout;
}


@Component({
  selector: 'aava-image-card',
  standalone: true,
  imports: [
    CommonModule,
    AavaDefaultCardComponent,
    AavaTagComponent,
    AavaIconComponent,
    AavaAvatarsComponent,
    AavaDividersComponent,
    AavaButtonComponent
  ],
  templateUrl: './aava-image-card.component.html',
  styleUrl: './aava-image-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaImageCardComponent {
  @Input() data: ImageCardData = {
    variant: 'withActions',
    type: 'default',
    title: '',
    image: '',
    layout: {
      orientation: 'vertical',
      imageGrid: 'top',
      infoGrid: 'bottom'
    }
  };

  @Output() cardClick = new EventEmitter<void>();
  @Output() buttonClicked = new EventEmitter<{ action: string | undefined, button: ImageCardButton }>();

  onCardClick() {
    this.cardClick.emit();
  }

  onButtonClick(action: string | undefined, button: ImageCardButton) {
    this.buttonClicked.emit({ action, button });
  }

  get isVertical(): boolean {
    return this.data.layout.orientation === 'vertical';
  }

  get isHorizontal(): boolean {
    return this.data.layout.orientation === 'horizontal';
  }

  get isWithActions(): boolean {
    return this.data.variant === 'withActions';
  }

  get isWithoutActions(): boolean {
    return this.data.variant === 'withoutActions';
  }
}
