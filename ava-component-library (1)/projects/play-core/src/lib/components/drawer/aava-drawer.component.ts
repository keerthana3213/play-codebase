import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  HostListener,
  ViewEncapsulation,
  ChangeDetectionStrategy,

  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '../button/aava-button.component';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';



@Component({
  selector: 'aava-drawer',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './aava-drawer.component.html',
  styleUrls: ['./aava-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaDrawerComponent implements OnInit, OnDestroy, OnChanges {

  // Core Properties
  @Input() isOpen: boolean = false;
  @Input() position: DrawerPosition = 'right';
  @Input() size: DrawerSize = 'md';

  // Behavior Properties
  @Input() showOverlay: boolean = true;
  @Input() closeOnOverlayClick: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() persistent: boolean = false;
  @Input() resizable: boolean = false;
  @Input() animate: boolean = true;

  // Content Properties
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = false;

  // Styling Properties
  @Input() width: string = '';
  @Input() height: string = '';
  @Input() maxWidth: string = '';
  @Input() maxHeight: string = '';
  @Input() zIndex: number = 1050;

  // Icon Properties
  @Input() closeIcon: string = 'X';
  @Input() closeButtonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  // Custom styles
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  // Events
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() overlayClick = new EventEmitter<void>();
  @Output() escapePressed = new EventEmitter<void>();

  // Internal State
  private wasOpen = false;
  private animationTimeout?: number;

  ngOnInit(): void {
    this.wasOpen = this.isOpen;
    if (this.isOpen) {
      this.handleOpen();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen && !this.wasOpen) {
        this.handleOpen();
      } else if (!this.isOpen && this.wasOpen) {
        this.handleClose();
      }
      this.wasOpen = this.isOpen;
    }
  }

  ngOnDestroy(): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    this.removeBodyClass();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen && this.closeOnEscape && !this.persistent) {
      this.escapePressed.emit();
      this.close();
    }
  }

  /**
   * Opens the drawer
   */
  open(): void {
    if (!this.isOpen) {
      this.isOpen = true;
      this.handleOpen();
    }
  }

  /**
   * Closes the drawer
   */
  close(): void {
    if (this.isOpen && !this.persistent) {
      this.isOpen = false;
      this.handleClose();
    }
  }

  /**
   * Toggles the drawer open/closed state
   */
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Handles overlay click
   */
  onOverlayClick(): void {
    this.overlayClick.emit();
    if (this.closeOnOverlayClick && !this.persistent) {
      this.close();
    }
  }

  /**
   * Handles close button click
   */
  onCloseClick(): void {
    if (!this.persistent) {
      this.close();
    }
  }

  /**
   * Prevents event bubbling when clicking inside drawer
   */
  onDrawerClick(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Gets the drawer CSS classes
   */
  getDrawerClasses(): string {
    const classes = [
      'aava-drawer',
      `aava-drawer--${this.position}`,
      `aava-drawer--${this.size}`
    ];

    if (this.isOpen) {
      classes.push('aava-drawer--open');
    }

    if (this.resizable) {
      classes.push('aava-drawer--resizable');
    }

    return classes.join(' ');
  }

  /**
   * Gets the overlay CSS classes
   */
  getOverlayClasses(): string {
    const classes = ['aava-drawer-overlay'];

    if (this.isOpen) {
      classes.push('aava-drawer-overlay--open');
    }

    return classes.join(' ');
  }

  /**
   * Gets the drawer content styles
   */
  getDrawerStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {
      'z-index': this.zIndex.toString()
    };

    if (this.width && (this.position === 'left' || this.position === 'right')) {
      styles['width'] = this.width;
    }

    if (this.height && (this.position === 'top' || this.position === 'bottom')) {
      styles['height'] = this.height;
    }

    if (this.maxWidth) {
      styles['max-width'] = this.maxWidth;
    }

    if (this.maxHeight) {
      styles['max-height'] = this.maxHeight;
    }

    // Apply custom styles
    Object.assign(styles, this.customStyles);

    return styles;
  }

  /**
   * Handles drawer opening
   */
  private handleOpen(): void {
    this.addBodyClass();

    // Emit opened event after animation completes
    if (this.animate) {
      this.animationTimeout = window.setTimeout(() => {
        this.opened.emit();
      }, 250); // Match CSS animation duration
    } else {
      this.opened.emit();
    }
  }

  /**
   * Handles drawer closing
   */
  private handleClose(): void {
    this.closed.emit();

    // Remove body class after animation completes
    if (this.animate) {
      this.animationTimeout = window.setTimeout(() => {
        this.removeBodyClass();
      }, 250); // Match CSS animation duration
    } else {
      this.removeBodyClass();
    }
  }

  /**
   * Adds body class to prevent scrolling
   */
  private addBodyClass(): void {
    if (this.showOverlay) {
      document.body.classList.add('aava-drawer-open');
    }
  }

  /**
   * Removes body class to restore scrolling
   */
  private removeBodyClass(): void {
    document.body.classList.remove('aava-drawer-open');
  }
}
