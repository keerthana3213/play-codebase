import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  signal,
  HostListener
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface FileAttachOption {
  name: string;
  icon: string;
  value: string;
  useCustomIcon?: boolean; // If true, 'icon' is treated as URL/path
}

@Component({
  selector: 'aava-file-attach-pill',
  imports: [AavaIconComponent, CommonModule],
  templateUrl: './aava-file-attach-pill.component.html',
  styleUrl: './aava-file-attach-pill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.theme-dark]': 'currentTheme === "dark"',
    '[class.theme-light]': 'currentTheme === "light"'
  }
})
export class AavaFileAttachPillComponent {
  @Input() options: FileAttachOption[] = [
    { name: 'From Computer', icon: 'upload', value: 'computer' },
    { name: 'From Cloud', icon: 'cloud-upload', value: 'cloud' },
    { name: 'From URL', icon: 'link', value: 'url' }
  ];

  @Input() mainIcon = 'paperclip';
  @Input() useCustomMainIcon = false;
  @Input() mainText = 'Attach File';
  @Input() currentTheme: 'light' | 'dark' = 'light';
  @Input() iconSize = 20;
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() optionSelected = new EventEmitter<FileAttachOption>();

  isHovered = signal(false);
  isDropdownOpen = signal(false);
  private isMouseOverDropdown = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    // Close dropdown after a small delay to allow moving to dropdown
    setTimeout(() => {
      if (!this.isMouseOverDropdown) {
        this.closeDropdown();
      }
    }, 100);
  }

  onDropdownMouseEnter(): void {
    this.isMouseOverDropdown = true;
  }

  onDropdownMouseLeave(): void {
    this.isMouseOverDropdown = false;
    this.closeDropdown();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update(value => !value);
  }

  selectOption(option: FileAttachOption, event: Event): void {
    event.stopPropagation();
    this.optionSelected.emit(option);
    this.closeDropdown();
  }

  private closeDropdown(): void {
    this.isDropdownOpen.set(false);
    this.isHovered.set(false);
  }

  get iconColor(): string {
    return this.currentTheme === 'dark' ? 'white' : 'gray';
  }

  trackByOptionValue(index: number, option: FileAttachOption): string {
    return option.value;
  }

  isCustomIcon(option?: FileAttachOption): boolean {
    if (option) {
      return option.useCustomIcon || false;
    }
    return this.useCustomMainIcon;
  }
}