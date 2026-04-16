import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSidebarComponent } from '../../components/sidebar/aava-sidebar.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaSearchBarComponent } from '../search-bar/aava-search-bar.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaDividersComponent, AavaLinkComponent } from '../../../public-api';

export interface SidebarItem {
  id: string;
  icon: string;
  text: string;
  route?: string;
  active?: boolean;
}

@Component({
  selector: 'aava-custom-sidebar',
  imports: [
    CommonModule,
    AavaSidebarComponent,
    AavaIconComponent,
    AavaSearchBarComponent,
    AavaButtonComponent,
    AavaLinkComponent,
    AavaDividersComponent,
  ],
  templateUrl: './aava-custom-sidebar.component.html',
  styleUrl: './aava-custom-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaCustomSidebarComponent extends AavaSidebarComponent {
  @Input() size: 'lg' | 'md' | 'sm' = 'lg';
  @Input() toggleButtonSize: 'md' | 'sm' | 'xs' = 'md';
  @Input() searchIconSize: 'md' | 'sm' | 'xs' = 'sm';

  /** Configurable logo */
  @Input() logoUrl: string = '../../../assets/ascendion.png';
  @Input() logoUrl_collapsed: string = '../../../assets/ascendion_logo.svg';
  @Input() logoAlt: string = 'Ascendion Logo';
  @Input() logoAltCollapsed: string = 'Ascendion Logo Collapsed';

  /** Footer Usage */
  @Input() avatarUrl: string = '../../../assets/1.svg';
  @Input() avatarAlt: string = 'User Avatar';
  @Input() userName: string = 'John Doe';
  @Input() profileText: string = 'View Profile';

  /** Sidebar items */
  @Input() items: SidebarItem[] = [];

  /** Custom events */
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() searchChanged = new EventEmitter<string>();

  searchText: string = '';

  get iconColor(): string {
    return 'var(--sidebar-active-color)';
  }

  onItemClick(item: SidebarItem): void {
    this.itemClick.emit(item);
  }

  onCollapseToggle(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
    this.collapseToggle.emit(isCollapsed);
  }

  onTextboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value;
    this.searchChanged.emit(this.searchText);
  }

  onSearch(event: any, from: string) {
  }

  onSearchClickCollapsed() {
  }

  // get resolvedToggleButtonSize(): 'lg' | 'md' | 'sm' {
  //   if (this.toggleButtonSize) return this.toggleButtonSize;
  //   switch (this.size) {
  //     case 'medium':
  //       return 'md';
  //     case 'small':
  //       return 'sm';
  //     default:
  //       return 'lg';
  //   }
  // }
}
