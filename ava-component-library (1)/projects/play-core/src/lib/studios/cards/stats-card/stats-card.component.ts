import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';

export interface StatsCardData {
  icon: string | {
    name: string;
    color?: string;
    size?: number;
  };
  label: string;
  value: string;
  valueColor: string;
}

@Component({
  selector: 'aava-stats-card',
  imports: [CommonModule, AavaIconComponent, AavaDefaultCardComponent],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardComponent {
  @Input() data: StatsCardData = {
    icon: '',
    label: '',
    value: '',
    valueColor: '#000000'
  };

  get iconName(): string {
    return typeof this.data.icon === 'string' ? this.data.icon : this.data.icon.name;
  }

  get iconColor(): string {
    return typeof this.data.icon === 'string'
      ? 'var(--Colors-Text-secondary, #616874)'
      : this.data.icon.color || 'var(--Colors-Text-secondary, #616874)';
  }

  get iconSize(): number {
    return typeof this.data.icon === 'string'
      ? 20
      : this.data.icon.size || 20;
  }
}
