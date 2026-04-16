import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';

export interface NavigationCard {
  id: string;
  title: string;
  description?: string;
  image?: string;
  hoverImage?: string;
  action?: string;
}

export interface NavigationCardsConfig {
  heading?: string;
  cards: NavigationCard[];
}

@Component({
  selector: 'aava-navigation-cards',
  imports: [CommonModule, AavaDefaultCardComponent],
  templateUrl: './aava-navigation-cards.component.html',
  styleUrl: './aava-navigation-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaNavigationCardsComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() config: NavigationCardsConfig = { cards: [] };
  @Input() position: { top: number } = { top: 0 };
  @Input() isVisible = false;
  @Output() cardClick = new EventEmitter<NavigationCard>();
  @Output() closeRequested = new EventEmitter<void>();

  hoveredCardId: string | null = null;
  focusedCardIndex: number = -1;
  private previousActiveElement: HTMLElement | null = null;

  ngAfterViewInit(): void {
    if (this.isVisible) {
      this.trapFocus();
    }
  }

  ngOnDestroy(): void {
    this.releaseFocus();
  }

  onCardClick(card: NavigationCard): void {
    this.cardClick.emit(card);
  }

  getCardImage(card: NavigationCard): string | undefined {
    if (this.hoveredCardId === card.id && card.hoverImage) {
      return card.hoverImage;
    }
    return card.image;
  }

  onCardHover(cardId: string): void {
    this.hoveredCardId = cardId;
  }

  onCardLeave(): void {
    this.hoveredCardId = null;
  }

  onCardKeyDown(event: KeyboardEvent, card: NavigationCard, index: number): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onCardClick(card);
        break;
      case 'Escape':
        event.preventDefault();
        this.handleEscape();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.focusNextCard(index);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusPreviousCard(index);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusBelowCard(index);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusAboveCard(index);
        break;
      case 'Tab':
        // Trap Tab navigation within the cards
        this.handleTab(event, index);
        break;
    }
  }

  private handleEscape(): void {
    this.releaseFocus();
    this.closeRequested.emit();
  }

  private handleTab(event: KeyboardEvent, currentIndex: number): void {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    if (event.shiftKey) {
      // Shift+Tab: Move to previous card
      if (currentIndex <= 0) {
        // At first card, wrap to last card
        event.preventDefault();
        focusableElements[focusableElements.length - 1].focus();
        this.focusedCardIndex = focusableElements.length - 1;
      }
    } else {
      // Tab: Move to next card
      if (currentIndex >= focusableElements.length - 1) {
        // At last card, wrap to first card
        event.preventDefault();
        focusableElements[0].focus();
        this.focusedCardIndex = 0;
      }
    }
  }

  private focusNextCard(currentIndex: number): void {
    const focusableElements = this.getFocusableElements();
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    if (focusableElements[nextIndex]) {
      focusableElements[nextIndex].focus();
      this.focusedCardIndex = nextIndex;
    }
  }

  private focusPreviousCard(currentIndex: number): void {
    const focusableElements = this.getFocusableElements();
    const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
    if (focusableElements[prevIndex]) {
      focusableElements[prevIndex].focus();
      this.focusedCardIndex = prevIndex;
    }
  }

  private focusBelowCard(currentIndex: number): void {
    const focusableElements = this.getFocusableElements();
    const columns = 3; // Based on the CSS grid-template-columns: repeat(3, 1fr)
    const nextIndex = currentIndex + columns;

    if (focusableElements[nextIndex]) {
      focusableElements[nextIndex].focus();
      this.focusedCardIndex = nextIndex;
    }
  }

  private focusAboveCard(currentIndex: number): void {
    const focusableElements = this.getFocusableElements();
    const columns = 3; // Based on the CSS grid-template-columns: repeat(3, 1fr)
    const prevIndex = currentIndex - columns;

    if (focusableElements[prevIndex]) {
      focusableElements[prevIndex].focus();
      this.focusedCardIndex = prevIndex;
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const container = document.getElementById('navigation-cards-container');
    if (!container) {
      return [];
    }
    const elements = Array.from(container.querySelectorAll('.navigation-card[tabindex="0"]')) as HTMLElement[];
    // Filter out disabled elements
    return elements.filter(el => {
      const tabIndex = el.getAttribute('tabindex');
      return !el.hasAttribute('disabled') &&
        !el.hasAttribute('aria-disabled') &&
        (tabIndex === null || parseInt(tabIndex, 10) >= 0);
    });
  }

  private trapFocus(): void {
    // Store the previously focused element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Focus the first card after a short delay to ensure the container is rendered
    setTimeout(() => {
      const focusableElements = this.getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        this.focusedCardIndex = 0;
      }
    }, 50);
  }

  private releaseFocus(): void {
    // Return focus to the previously active element
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      try {
        this.previousActiveElement.focus({ preventScroll: true });
      } catch (e) {
        // Fallback for browsers that don't support preventScroll
        this.previousActiveElement.focus();
      }
    }
    this.previousActiveElement = null;
    this.focusedCardIndex = -1;
  }

  // Handle visibility changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible']) {
      if (this.isVisible) {
        setTimeout(() => {
          this.trapFocus();
        }, 0);
      } else {
        this.releaseFocus();
      }
    }
  }
}
