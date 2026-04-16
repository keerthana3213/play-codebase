import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaAvatarsComponent } from '../../components/avatars/aava-avatars.component';
import { AavaLinkComponent } from '../../components/link/aava-link.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaDividersComponent } from '../../components/dividers/aava-dividers.component';

export interface ListCardColumn1 {
  columnItem: 'avatar' | 'icon';
  columnItemProps: {
    // For avatar
    imageUrl?: string;
    profileText?: string;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    shape?: 'pill' | 'square';
    // For icon
    iconName?: string;
    iconColor?: string;
    iconSize?: number | string;
  };
}

export interface ListCardColumn2 {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    toLocation?: string;
    href?: string;
    color?: string;
  };
}

export interface ListCardColumn3 {
  button?: {
    text: string;
    action?: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    color?: string;
  };
}

export interface ListCardItem {
  column1?: ListCardColumn1;
  column2?: ListCardColumn2;
  column3?: ListCardColumn3;
}

export interface ListCardData {
  heading: string;
  listItems: ListCardItem[];
}

@Component({
  selector: 'aava-list-card',
  imports: [
    CommonModule,
    AavaDefaultCardComponent,
    AavaIconComponent,
    AavaAvatarsComponent,
    AavaLinkComponent,
    AavaButtonComponent,
    AavaDividersComponent
  ],
  templateUrl: './aava-list-card.component.html',
  styleUrl: './aava-list-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaListCardComponent {
  @Input() data: ListCardData = {
    heading: '',
    listItems: []
  };

  @Output() buttonClicked = new EventEmitter<{ action: string | undefined, item: ListCardItem }>();
  @Output() linkClicked = new EventEmitter<{ link: any, item: ListCardItem }>();

  onButtonClick(action: string | undefined, item: ListCardItem) {
    if (action) {
      // Emit event for parent component to handle
      this.buttonClicked.emit({ action, item });
    }
  }

  onLinkClick(link: any, item: ListCardItem) {
    // Emit event for parent component to handle
    this.linkClicked.emit({ link, item });
  }
}
