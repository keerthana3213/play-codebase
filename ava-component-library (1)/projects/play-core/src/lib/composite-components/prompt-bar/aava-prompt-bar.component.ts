import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AavaIconComponent } from '../../../lib/components/icon/aava-icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '../../../lib/components/textarea/aava-textarea.component';
import { AavaSelectComponent } from '../../../lib/components/select/aava-select.component';
import { AavaSelectOptionComponent } from '../../../lib/components/select/select-option/aava-select-option.component';
import { AavaTagComponent } from '../../../lib/components/tags/aava-tags.component';
import { LucideAngularModule } from 'lucide-angular';


export interface PromptIcons {
  name: string;
  click?: () => void;
  size?: string;
  color?: string;
  slot: 'icon-start' | 'icon-end';
  visible?: boolean;
}

export interface PromptBarOption {
  label: string;
  value: string;
  icon: string;
}

export interface PromptBarTag {
  id: string | number;
  label: string;
  avatar?: string;
  removable?: boolean;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom';
  variant?: 'filled' | 'outlined';
  icon?: string;
  iconPosition?: 'start' | 'end';
  customClass?: string;
  customStyle?: Record<string, string>;
  file?: File; // Add file property for image preview functionality
}

@Component({
  selector: 'aava-prompt-bar',
  imports: [
    CommonModule,
    FormsModule,
    AavaTextareaComponent,
    AavaIconComponent,
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaTagComponent,
    LucideAngularModule,
  ],
  templateUrl: './aava-prompt-bar.component.html',
  styleUrl: './aava-prompt-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaPromptBarComponent
  implements AfterViewChecked, AfterViewInit, OnChanges {
  @Input() placeholder = 'Type a message';
  @Input() disabled = false;
  @Input() icons: PromptIcons[] = [];
  @Input() rows?: number;
  @Input() deviceOptions: PromptBarOption[] = [];
  @Input() showSelection = false;
  @Input() selectPlaceholder = 'Select a user';
  @Input() fileOption = '';
  @Input() size: 'lg' | 'md' | 'sm'  = 'md';
  @Input() tags: PromptBarTag[] = [];
  @Output() messageSent = new EventEmitter<string>();
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() textAreaMaxHeight: number = 0;
  @Input() textAreaAutoResize = false;
  @Input() selectWidth: string = '144px'; // Default width for the select component
  @Input() showImage: boolean = false; // New input for image preview feature

  @Output() iconClicked = new EventEmitter<{
    icon: PromptIcons;
    currentMessage: string;
  }>();

  @Output() tagRemoved = new EventEmitter<PromptBarTag>();

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  currentMessage = '';
  private shouldScrollToBottom = false;

  openFilterField: string | null = null;
  defaultColumnFilters: {
    [field: string]: {
      value: string;
      type: string;
    };
  } = {};

  /** Get icon size based on tag size */
  get getIconSize(): number {
    switch (this.size) {

      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      default:
        return 12;
    }
  }

  /** Get computed rows based on size or user override */
  get computedRows(): number {
    if (this.rows !== undefined) {
      return this.rows; // User provided override
    }

    // Size-based defaults
    switch (this.size) {
      case 'sm':
        return 2;
      case 'md':
        return 3;
      case 'lg':
        return 4;
      default:
        return 3;
    }
  }

  /** Get select size based on prompt-bar size */
  get getSelectSize(): 'xs' | 'sm' | 'md' | 'lg' {
    switch (this.size) {
      case 'sm':
        return 'xs';
      case 'md':
        return 'sm';
      case 'lg':
        return 'md';
      default:
        return 'sm';
    }
  }

  /** Get tag size based on prompt-bar size */
  get getTagSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    switch (this.size) {
      case 'sm':
        return 'lg';
      case 'md':
        return 'lg';
      case 'lg':
        return 'xl';
      default:
        return 'lg';
    }
  }

  get computedStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      ...(this.width > 0 ? { width: `${this.width}px` } : {}),
      ...(this.height > 0 ? { height: `${this.height}px` } : {}),
    };

    return styles;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Scroll to bottom when messages array changes
    if (changes['messages'] && changes['messages'].currentValue) {
      this.shouldScrollToBottom = true;
    }
  }

  ngAfterViewInit() {
    // Scroll to bottom when component loads
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  sendMessage() {
    const messageText = this.currentMessage.trim();
    if (!messageText || this.disabled) return;

    this.messageSent.emit(messageText);
    this.currentMessage = '';
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.currentMessage = target.value;
  }

  focusInput(event: Event) {
    const target = event.target as HTMLInputElement;
    target.focus();
  }

  onIconClick(icon: PromptIcons) {
    // Emit icon click event with current message so user can handle it
    this.iconClicked.emit({ icon, currentMessage: this.currentMessage });

    // Also call the icon's custom click handler if provided
    if (icon.click) {
      icon.click();
    }
  }

  getIconsBySlot(slot: 'icon-start' | 'icon-end'): PromptIcons[] {
    return this.icons.filter((icon) => icon.slot === slot);
  }

  // Public method to trigger send from outside
  public triggerSend() {
    this.sendMessage();
  }

  // Public method to get current message
  public getCurrentMessage(): string {
    return this.currentMessage;
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight;
      });
    }
  }

  onTagRemove(tag: PromptBarTag) {
    this.tagRemoved.emit(tag);
  }

  onSelectionChange(_data: any) {
    // Handle selection change if needed
  }

  // Get the size class for the carousel container
  getPromptBarSizeClass(): string {
    return `aava-prompt-bar--${this.size}`;
  }

  // Image preview functionality
  isImageFile(file: File): boolean {
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    const extension = this.getFileExtension(file.name);
    return imageFormats.includes(extension);
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  // Get tags to display as thumbnails (exclude image files when showImage is true)
  getDisplayTags(): PromptBarTag[] {
    if (!this.showImage) {
      return this.tags;
    }
    // When showImage is true, filter out image files from tag display
    return this.tags.filter(tag => !tag.file || !this.isImageFile(tag.file));
  }

  // Get image files to display as previews (only when showImage is true)
  getImagePreviewTags(): PromptBarTag[] {
    if (!this.showImage) {
      return [];
    }
    return this.tags.filter(tag => tag.file && this.isImageFile(tag.file));
  }

  // Get image preview URL for display
  getImagePreviewUrl(tag: PromptBarTag): string {
    if (!tag.file) return '';
    return URL.createObjectURL(tag.file);
  }


}
