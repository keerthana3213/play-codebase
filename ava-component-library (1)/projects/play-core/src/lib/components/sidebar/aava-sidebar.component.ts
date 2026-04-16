import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { AavaButtonComponent } from '../button/aava-button.component';

@Component({
  selector: 'aava-sidebar',
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './aava-sidebar.component.html',
  styleUrl: './aava-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaSidebarComponent implements OnInit, OnChanges {
  @Input() width: string = '';
  @Input() collapsedWidth: string = '108px';
  @Input() height: string = '';
  @Input() hoverAreaWidth: string = '10px';
  @Input() showCollapseButton: boolean = true;
  @Input() buttonVariant: 'inside' | 'outside' = 'inside';
  @Input() isCollapsed: boolean = false;
  @Input() position: 'left' | 'right' = 'left';
  @Input() toggleOffset = 400;
  @Input() togglePosition: 'top' | 'center' | 'bottom' = 'top';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() collapseToggle = new EventEmitter<boolean>();

  private _isCollapsed = false;

  constructor() {}

  ngOnInit() {
    this._isCollapsed = this.isCollapsed;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCollapsed'] && !changes['isCollapsed'].firstChange) {
      this._isCollapsed = this.isCollapsed;
    }
  }

  toggleCollapse(): void {
    this._isCollapsed = !this._isCollapsed;
    this.collapseToggle.emit(this._isCollapsed);
  }

  get sidebarWidth(): string {
    return this._isCollapsed ? this.collapsedWidth : this.width;
  }

  get collapsed(): boolean {
    return this._isCollapsed;
  }

  getOffsetTop() {
    return 8 + this.toggleOffset;
  }

  get toggleCustomStyles() {
    if (this.togglePosition === 'center') {
      return {
        top: '50%',
        transform: 'translateY(-50%)',
      };
    }

    if (this.togglePosition === 'top') {
      return { top: this.toggleOffset };
    }

    if (this.togglePosition === 'bottom') {
      return { bottom: this.toggleOffset };
    }

    return {}; // fallback
  }
}
