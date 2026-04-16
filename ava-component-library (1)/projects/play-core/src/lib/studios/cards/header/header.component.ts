import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTabsComponent, TabItem } from '../../../components/tabs/aava-tabs.component';
import { AavaButtonComponent } from '../../../components/button/aava-button.component';

export interface HeaderButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | 'tertiary';
  action?: string;
  disabled?: boolean;
}

export interface HeaderData {
  primaryHeading?: string;
  secondaryHeading?: string;
  tabs?: TabItem[];
  buttons?: HeaderButton[];
  numberText?: {
    number: string;
    text: string;
    numberColor?: string;
  };
}

@Component({
  selector: 'aava-studio-card-header',
  imports: [CommonModule, AavaTabsComponent, AavaButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() data: HeaderData = {};
  @Output() tabChange = new EventEmitter<TabItem>();
  @Output() buttonClick = new EventEmitter<{ button: HeaderButton; action?: string }>();

  activeTabId = '';

  onTabChange(tab: TabItem): void {
    this.activeTabId = tab.id;
    this.tabChange.emit(tab);
  }

  onButtonClick(button: HeaderButton): void {
    this.buttonClick.emit({ button, action: button.action });
  }
}
