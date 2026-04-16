import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AavaTextboxComponent } from '../../components/textbox/aava-textbox.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaFlyoutComponent } from '../../components/flyout/aava-flyout.component';
import { AavaSpinnerComponent } from '../../components/spinner/aava-spinner.component';

export interface SearchSuggestion {
  id: string | number;
  label: string;
  value: any;
  icon?: string;
}

@Component({
  selector: 'aava-search-bar',
  imports: [CommonModule, AavaTextboxComponent, AavaIconComponent, AavaFlyoutComponent, AavaSpinnerComponent],
  templateUrl: './aava-search-bar.component.html',
  styleUrl: './aava-search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaSearchBarComponent extends AavaTextboxComponent {
  @ViewChild('searchBarContainer', { static: false }) searchBarContainer!: ElementRef<HTMLElement>;
  @ViewChild('suggestionsFlyout', { static: false }) suggestionsFlyout!: AavaFlyoutComponent;

  @Output() searchClick = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<string>();

  @Input() searchIconColor = 'var(--icon-color)';
  @Input() sendIconColor = 'var(--icon-color)';
  @Input() sendButton = true;
  @Input() closeButton = false;
  @Input() closeButtonVisibility: 'auto' | 'always' | 'hidden' = 'hidden';
  @Input() showAutocomplete = false;
  @Input() options: SearchSuggestion[] = [];
  @Input() flyoutWidth = 0;
  @Input() noResultsMessage = 'No results found'; // Message when no options match
  @Input() isLoading = false; // Loading state for options
  @Input() minLength: number = 0; // Minimum length before showing options (0 = no minimum)

  searchValue: string = '';
  isSuggestionsOpen = false;

  get iconSize(): number {
    return (
      ({ xl: 24, lg: 24, md: 20, xs: 16 } as Record<string, number>)[
      this.size
      ] ?? 16
    );
  }

  get iconSearchColor(): string {
    if (this.disabled) return 'var(--button-icon-color-disabled)';
    return this.searchIconColor;
  }

  get iconSendColor(): string {
    if (this.disabled) return 'var(--button-icon-color-disabled)';
    return this.sendIconColor;
  }
  get showClose(): boolean {
    return this.searchValue.trim().length > 0 || this.value.length > 0;
  }

  get placeH(): string{
    if(this.placeholder && this.placeholder.length>0) {
      return this.placeholder;
    }
    return 'Search';
  }

  get shouldShowNoResults(): boolean {
    const searchLength = this.searchValue.trim().length;

    // Don't show "no results" if no search has been performed
    if (searchLength === 0) {
      return false;
    }

    // Don't show "no results" when using ng-content approach
    // We detect this by: showAutocomplete is true, but options array is empty and was never populated
    // In ng-content mode, users manage their own content, so we shouldn't show our "no results" message
    const isLikelyNgContent = this.showAutocomplete && this.options.length === 0 && !this.isLoading;

    // Additional check: if minLength is 0 (default) and options is empty, likely using ng-content
    if (isLikelyNgContent && this.minLength === 0) {
      return false;
    }

    // Scenario 1: User hasn't typed enough characters (below minLength threshold)
    const belowMinLength = this.minLength > 0 && searchLength > 0 && searchLength < this.minLength;

    // Scenario 2: User has typed enough characters but no options match
    const meetsMinLength = this.minLength === 0 ? searchLength > 0 : searchLength >= this.minLength;
    const noMatchingResults = meetsMinLength && this.options.length === 0;

    return !this.isLoading && (belowMinLength || noMatchingResults);
  }

  get shouldShowOptions(): boolean {
    const searchLength = this.searchValue.trim().length;
    // If minLength is 0, show options for any input length > 0
    // If minLength > 0, only show options when length >= minLength
    const meetsMinLength = this.minLength === 0 ? searchLength > 0 : searchLength >= this.minLength;
    return !this.isLoading && meetsMinLength && this.options.length > 0;
  }

  // Handle clicks outside the component to close suggestions
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isSuggestionsOpen) return;

    const target = event.target as HTMLElement;
    const componentElement = this.searchBarContainer?.nativeElement;
    const flyoutElement = this.suggestionsFlyout?.panelRef?.nativeElement;

    // Close if click is outside both the component and the flyout
    const isInsideComponent = componentElement && componentElement.contains(target);
    const isInsideFlyout = flyoutElement && flyoutElement.contains(target);

    if (!isInsideComponent && !isInsideFlyout) {
      this.closeSuggestions();
    }
  }

  search() {
    this.searchClick.emit(this.searchValue);
    this.closeSuggestions();
  }

  clear() {
    this.searchValue = '';
    this.searchChange.emit(this.searchValue);
    this.value = '';
    this.onClose.emit(this.searchValue);
    this.closeSuggestions();
  }

  change01(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
    this.value = this.searchValue;
    this.searchChange.emit(this.searchValue);

    // Open options when user types (if showAutocomplete is enabled)
    if (this.showAutocomplete && this.searchValue.trim().length > 0) {
      this.openSuggestions();
    } else {
      this.closeSuggestions();
    }
  }

  openSuggestions() {
    if (!this.showAutocomplete || this.disabled) return;

    this.isSuggestionsOpen = true;
    // Use setTimeout to ensure the DOM is ready
    setTimeout(() => {
      if (this.searchBarContainer && this.suggestionsFlyout) {
        this.suggestionsFlyout.openRelativeTo(this.searchBarContainer.nativeElement);
      }
    }, 0);
  }

  closeSuggestions() {
    this.isSuggestionsOpen = false;
    if (this.suggestionsFlyout) {
      this.suggestionsFlyout.close();
    }
  }

  onSuggestionClick(suggestion: SearchSuggestion) {
    this.searchValue = suggestion.label;
    this.closeSuggestions();
  }
}
