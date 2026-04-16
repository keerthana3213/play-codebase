import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TabItem } from '../tabs/aava-tabs.component';

@Component({
  selector: 'aava-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aava-header.component.html',
  styleUrl: './aava-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaHeaderComponent {
  @Input() theme: 'light' | 'dark' | 'transparent' = 'light';
  @Input() containerClass: string = '';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  /** Tabs definition (without active flags) */
  @Input() tabs: TabItem[] = [
    {
      id: 'tab1',
      label: 'Tab1',
      content: 'Content 1',
      iconName: 'chevron-right',
    },
    {
      id: 'tab2',
      label: 'Tab2',
      content: 'Content 2',
      iconName: 'chevron-right',
    },
    {
      id: 'tab3',
      label: 'Tab3',
      content: 'Content 1',
      iconName: 'chevron-right',
    },
    {
      id: 'tab4',
      label: 'Tab4',
      content: 'Content 2',
      iconName: 'chevron-right',
    },
  ];

  /** Current active tab id */
  @Input() activeTabId: string = 'home';

  /** Change active tab */
  setActiveTab(tabId: string) {
    this.activeTabId = tabId;
  }
  get computedTabs(): TabItem[] {
    return this.tabs.map((tab) => ({
      ...tab,
      active: tab.id === this.activeTabId,
    }));
  }
}
