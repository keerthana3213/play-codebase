import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService, Theme, Personality } from '../../services/theme.service';

@Component({
  selector: 'ava-theme-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-demo.component.html',
  styleUrl: './theme-demo.component.scss',
})
export class ThemeDemoComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  currentPersonality: Personality = 'minimal';
  currentUrl = '';

  // Make window available to template
  window = window;

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        this.currentTheme = theme;
      });

    // Subscribe to personality changes
    this.themeService.personality$
      .pipe(takeUntil(this.destroy$))
      .subscribe((personality) => {
        this.currentPersonality = personality;
      });

    // Update current URL display
    this.updateCurrentUrl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Set theme via service
   */
  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.updateCurrentUrl();
  }

  /**
   * Set personality via service
   */
  setPersonality(personality: Personality): void {
    this.themeService.setPersonality(personality);
    this.updateCurrentUrl();
  }

  /**
   * Toggle theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateCurrentUrl();
  }

  /**
   * Reset to system theme preference
   */
  resetToSystemTheme(): void {
    this.themeService.clearThemePreference();
    this.updateCurrentUrl();
  }

  /**
   * Navigate to different routes with theme
   */
  navigateToButton(theme?: Theme): void {
    this.themeService.navigateWithTheme(['/button/basic-usage'], theme);
  }

  navigateToTabs(theme?: Theme): void {
    this.themeService.navigateWithTheme(['/tabs/basic'], theme);
  }

  /**
   * Get shareable URL with current theme
   */
  getShareableUrl(): string {
    return (
      window.location.origin +
      this.themeService.getUrlWithTheme(
        this.currentTheme,
        this.currentPersonality
      )
    );
  }

  /**
   * Copy URL to clipboard
   */
  async copyUrlToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.getShareableUrl());
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  }

  /**
   * Clear theme from URL
   */
  clearThemeFromUrl(): void {
    this.themeService.clearThemeFromUrl();
    this.updateCurrentUrl();
  }

  /**
   * Check if URL has theme parameters
   */
  get hasThemeInUrl(): boolean {
    return this.themeService.hasThemeInUrl();
  }

  /**
   * Update current URL display
   */
  private updateCurrentUrl(): void {
    this.currentUrl = this.router.url;
  }
}
