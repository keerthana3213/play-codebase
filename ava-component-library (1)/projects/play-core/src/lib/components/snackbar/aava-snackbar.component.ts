import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { SnackbarService, SnackbarAction } from './snackbar.service';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaLinkComponent } from '../link/aava-link.component';
import { AavaButtonComponent } from '../button/aava-button.component';

@Component({
  selector: 'aava-snackbar',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaLinkComponent, AavaButtonComponent],
  templateUrl: './aava-snackbar.component.html',
  styleUrls: ['./aava-snackbar.component.scss'],
})
export class AavaSnackbarComponent {
  snackbarService = inject(SnackbarService);
  
  // Directly expose the readonly signal to the template
  snackbar$ = this.snackbarService.snackbar$;

  /**
   * Helper getter for snackbar variant.
   */
  get variant(): string | undefined {
    return this.snackbar$()?.variant;
  }

  /**
   * Helper getter for snackbar type.
   */
  get type(): string | undefined {
    return this.snackbar$()?.type;
  }

  /**
   * Gets the ARIA live region level based on snackbar type.
   * 'polite' for status messages, 'assertive' for alerts.
   */
  get ariaLive(): 'polite' | 'assertive' {
    const snackbar = this.snackbar$();
    // Use 'assertive' for important messages, 'polite' for status updates
    return snackbar?.styleType === 'danger' || snackbar?.styleType === 'warning' 
      ? 'assertive' 
      : 'polite';
  }

  /**
   * Gets the ARIA role for the snackbar.
   */
  get ariaRole(): 'alert' | 'status' {
    const snackbar = this.snackbar$();
    // Use 'alert' for important messages, 'status' for informational
    return snackbar?.styleType === 'danger' || snackbar?.styleType === 'warning' 
      ? 'alert' 
      : 'status';
  }

  /**
   * Handles action link click.
   * @param action - The snackbar action configuration
   */
  onActionClick(action: SnackbarAction | undefined): void {
    if (!action) return;
    
    if (action.callback) {
      try {
        action.callback();
      } catch (error) {
        console.error('AavaSnackbarComponent: Error in action callback', error);
      }
    }
    
    // If action has href, the link component will handle navigation
    // If showXInside is true, dismiss is already handled by the dismiss icon
    if (!action.showXInside && !action.href) {
      // Dismiss after action if no navigation
      this.onDismiss();
    }
  }

  /**
   * Dismisses the snackbar.
   */
  onDismiss(): void {
    this.snackbarService.dismiss();
  }

  /**
   * Gets the icon size based on snackbar size.
   * @param size - The snackbar size
   * @returns The icon size in pixels
   */
  getIconSize(size: 'sm' | 'md' | 'lg' | undefined): number {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 24;
      case 'lg':
        return 32;
      default:
        return 20;
    }
  }

  /**
   * Handles button click event.
   * @param event - The click event
   */
  onButtonClick(event: Event): void {
    const snackbar = this.snackbar$();
    if (snackbar?.onButtonClick) {
      try {
        snackbar.onButtonClick(event);
      } catch (error) {
        console.error('AavaSnackbarComponent: Error in button click handler', error);
      }
    }
  }

  /**
   * Handles keyboard events for accessibility.
   * Allows dismissing snackbar with Escape key.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.onDismiss();
    }
  }
}
