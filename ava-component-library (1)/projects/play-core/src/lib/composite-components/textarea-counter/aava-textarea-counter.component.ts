import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AavaTextareaComponent, AavaTextareaVariant } from '../../components/textarea/aava-textarea.component';

@Component({
  selector: 'aava-textarea-counter',
  standalone: true,
  imports: [CommonModule, AavaTextareaComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaTextareaCounterComponent),
      multi: true,
    },
  ],
  templateUrl: './aava-textarea-counter.component.html',
  styleUrls: ['./aava-textarea-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaTextareaCounterComponent extends AavaTextareaComponent {
  @Input() limit: number = 50;
  @Input() limitType: 'word' | 'character' = 'character';

  @Input() counterAlignment: 'left' | 'right' = 'right';
  @Input() showLimitError: boolean = true;

  @ViewChild(AavaTextareaComponent) baseTextarea!: AavaTextareaComponent;
  count: number = 0;
  // Computed properties
  get currentError(): string {
    if (this.showLimitError && this.count >= this.limit) {
      return `You have reached the limit of ${this.limit} ${this.limitType === 'word' ? 'words' : 'characters'}`;
    }
    if (this.error) return this.error;
    return '';
  }

  get counterText(): string {
    const unit = this.limitType === 'word' ? 'words' : 'characters';
    return `${this.count}/${this.limit} ${unit}`;
  }

  get isOverLimit(): boolean {
    return this.count > this.limit;
  }

  get computedVariant(): AavaTextareaVariant {
    if (this.showLimitError && this.count >= this.limit) {
      return 'error';
    }
    return this.variant;
  }

  private updateCount(value: string): void {
    if (this.limitType === 'word') {
      this.count = value.trim() ? value.trim().split(/\s+/).length : 0;
    } else {
      this.count = value.length;
    }
  }

  // Event handlers - delegate to outputs and handle counter logic
  onTextareaInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    let newValue = target.value;

    // Check if the new value exceeds the limit
    const newCount = this.limitType === 'word'
      ? (newValue.trim() ? newValue.trim().split(/\s+/).length : 0)
      : newValue.length;

    if (newCount > this.limit) {
      // Prevent the value from exceeding the limit
      const limitedValue = this.limitType === 'word'
        ? this.getLimitedWordsValue(newValue)
        : this.getLimitedCharsValue(newValue);

      target.value = limitedValue;
      newValue = limitedValue;

      // Set cursor to end of limited value
      setTimeout(() => {
        target.setSelectionRange(limitedValue.length, limitedValue.length);
      }, 0);
    }

    this.value = newValue;
    this.updateCount(newValue);
    this.textareaInput.emit(event);
  }

  onTextareaPaste(event: ClipboardEvent): void {
    const target = event.target as HTMLTextAreaElement;
    const pasteData = event.clipboardData?.getData('text') || '';

    if (!pasteData) return;

    event.preventDefault();

    const selectionStart = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;
    const currentValue = target.value;

    // Get the value after pasting
    const beforeSelection = currentValue.substring(0, selectionStart);
    const afterSelection = currentValue.substring(selectionEnd);
    const newValue = beforeSelection + pasteData + afterSelection;

    // Apply limits
    let limitedValue: string;
    if (this.limitType === 'word') {
      limitedValue = this.getLimitedWordsValue(newValue);
    } else {
      limitedValue = this.getLimitedCharsValue(newValue);
    }

    // Update the textarea value
    target.value = limitedValue;
    this.value = limitedValue;
    this.updateCount(limitedValue);

    // Position cursor at the end of pasted content (within limits)
    const pastedLength = limitedValue.length - beforeSelection.length;
    const newCursorPosition = selectionStart + pastedLength;
    setTimeout(() => {
      target.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);

    // Emit the input event
    const inputEvent = new Event('input', { bubbles: true });
    target.dispatchEvent(inputEvent);
  }

  onTextareaKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLTextAreaElement;

    // Allow navigation and control keys
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'PageUp', 'PageDown', 'Tab', 'Escape'
    ];

    if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
      return;
    }

    // Handle row limit for Enter key
    if (event.key === 'Enter') {
      const lines = target.value.split('\n');
      if (lines.length >= this.rows) {
        event.preventDefault();
        return;
      }
    }

    // For character limit, prevent input when at limit (unless text is selected)
    if (this.limitType === 'character') {
      if (this.count >= this.limit && target.selectionStart === target.selectionEnd) {
        event.preventDefault();
        return;
      }
    }

    // For word limit, check if adding this character would create a new word
    if (this.limitType === 'word') {
      const currentValue = target.value;
      const selectionStart = target.selectionStart || 0;
      const selectionEnd = target.selectionEnd || 0;

      // If text is selected, allow replacement
      if (selectionStart !== selectionEnd) {
        return;
      }

      // Check if we're at the limit and trying to add a space (new word)
      if (this.count >= this.limit && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        return;
      }

      // For other characters, simulate the input and check word count
      const beforeCursor = currentValue.substring(0, selectionStart);
      const afterCursor = currentValue.substring(selectionEnd);
      const newValue = beforeCursor + event.key + afterCursor;
      const newWordCount = newValue.trim() ? newValue.trim().split(/\s+/).length : 0;

      if (newWordCount > this.limit) {
        event.preventDefault();
        return;
      }
    }
  }

  // Delegate all other events
  onTextareaBlur(event: Event): void {
    this.textareaBlur.emit(event);
  }

  onTextareaFocus(event: Event): void {
    this.textareaFocus.emit(event);
  }

  onTextareaChange(event: Event): void {
    this.textareaChange.emit(event);
  }

  private getLimitedCharsValue(value: string): string {
    return value.substring(0, this.limit);
  }

  private getLimitedWordsValue(value: string): string {
    const words = value.trim().split(/\s+/);
    return words.slice(0, this.limit).join(' ');
  }
}