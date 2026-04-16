import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';
import { AavaAvatarsComponent } from '../../../components/avatars/aava-avatars.component';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';
import { AavaDividersComponent } from '../../../components/dividers/aava-dividers.component';

export interface ProfileCardStatItem {
  icon: string;
  iconColor: string;
  iconBackgroundColor: string;
  value: string;
  label: string;
}

export interface ProfileCardData {
  avatarUrl?: string;
  initials?: string;
  initialsBackground?: string;
  initialsColor?: string;
  title: string;
  subtitle: string;
  menuIcon?: string;
  stats: ProfileCardStatItem[];
}

@Component({
  selector: 'aava-profile-card',
  imports: [
    CommonModule,
    AavaDefaultCardComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaDividersComponent
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() data!: ProfileCardData;
}
