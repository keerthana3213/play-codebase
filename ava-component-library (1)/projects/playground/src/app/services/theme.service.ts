import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export type Theme = 'light' | 'dark';
export type Personality = 'minimal' | 'professional';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<Theme>('light');
  private currentPersonality$ = new BehaviorSubject<Personality>('minimal');

  constructor(private router: Router) {
    this.initializeFromHTML();
    this.setupRouterSubscription();
    this.initializeSystemThemeDetection();
  }

  /**
   * Get current theme as observable
   */
  get theme$(): Observable<Theme> {
    return this.currentTheme$.asObservable();
  }

  /**
   * Get current personality as observable
   */
  get personality$(): Observable<Personality> {
    return this.currentPersonality$.asObservable();
  }

  /**
   * Get current theme value
   */
  get currentTheme(): Theme {
    return this.currentTheme$.value;
  }

  /**
   * Get current personality value
   */
  get currentPersonality(): Personality {
    return this.currentPersonality$.value;
  }

  /**
   * Initialize theme from HTML document attributes
   */
  private initializeFromHTML(): void {
    const htmlElement = document.documentElement;
    const theme = htmlElement.getAttribute('data-theme') as Theme;
    const personality = htmlElement.getAttribute(
      'data-personality'
    ) as Personality;

    if (theme && (theme === 'light' || theme === 'dark')) {
      this.currentTheme$.next(theme);
    }

    if (
      personality &&
      (personality === 'minimal' || personality === 'professional')
    ) {
      this.currentPersonality$.next(personality);
    }
  }

  /**
   * Setup router subscription to watch for query parameter changes
   */
  private setupRouterSubscription(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateFromQueryParams();
      });
  }

  /**
   * Update theme/personality from current query parameters
   */
  private updateFromQueryParams(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const params = urlTree.queryParams;

    const themeParam = params['theme'] as Theme;
    const personalityParam = params['personality'] as Personality;

    if (
      themeParam &&
      themeParam !== this.currentTheme &&
      (themeParam === 'light' || themeParam === 'dark')
    ) {
      this.applyTheme(themeParam, false); // Don't update URL to avoid circular updates
    }

    if (
      personalityParam &&
      personalityParam !== this.currentPersonality &&
      (personalityParam === 'minimal' || personalityParam === 'professional')
    ) {
      this.applyPersonality(personalityParam, false); // Don't update URL to avoid circular updates
    }
  }

  /**
   * Set theme programmatically
   */
  setTheme(theme: Theme, updateUrl = true): void {
    this.applyTheme(theme, updateUrl);
  }

  /**
   * Set personality programmatically
   */
  setPersonality(personality: Personality, updateUrl = true): void {
    this.applyPersonality(personality, updateUrl);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(updateUrl = true): void {
    const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, updateUrl);
  }

  /**
   * Apply theme to DOM and state
   */
  private applyTheme(theme: Theme, updateUrl: boolean): void {
    if (theme === this.currentTheme) return;

    // Update DOM
    document.documentElement.setAttribute('data-theme', theme);

    // Update state
    this.currentTheme$.next(theme);

    // Save theme preference if manually set
    if (updateUrl) {
      this.saveThemePreference(theme);
      this.updateUrlWithCurrentParams({ theme });
    }
  }

  /**
   * Apply personality to DOM and state
   */
  private applyPersonality(personality: Personality, updateUrl: boolean): void {
    if (personality === this.currentPersonality) return;

    // Update DOM
    document.documentElement.setAttribute('data-personality', personality);

    // Update state
    this.currentPersonality$.next(personality);

    // Update URL if requested
    if (updateUrl) {
      this.updateUrlWithCurrentParams({ personality });
    }
  }

  /**
   * Update URL with new parameters while preserving existing ones
   */
  private updateUrlWithCurrentParams(newParams: {
    theme?: Theme;
    personality?: Personality;
  }): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const queryParams = { ...urlTree.queryParams };

    // Update with new parameters
    if (newParams.theme) {
      queryParams['theme'] = newParams.theme;
    }
    if (newParams.personality) {
      queryParams['personality'] = newParams.personality;
    }

    // Navigate to same route with updated query parameters
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true, // Use replaceUrl to avoid adding to browser history
    });
  }

  /**
   * Get URL with theme parameters for sharing
   */
  getUrlWithTheme(theme?: Theme, personality?: Personality): string {
    const urlTree = this.router.parseUrl(this.router.url);
    const queryParams = { ...urlTree.queryParams };

    if (theme) queryParams['theme'] = theme;
    if (personality) queryParams['personality'] = personality;

    urlTree.queryParams = queryParams;
    return this.router.serializeUrl(urlTree);
  }

  /**
   * Navigate to a route with theme parameters
   */
  navigateWithTheme(
    commands: unknown[],
    theme?: Theme,
    personality?: Personality,
    extras?: object
  ): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (theme) queryParams['theme'] = theme;
    if (personality) queryParams['personality'] = personality;

    return this.router.navigate(commands, {
      queryParams,
      queryParamsHandling: 'merge',
      ...extras,
    });
  }

  /**
   * Check if current URL has theme parameters
   */
  hasThemeInUrl(): boolean {
    const urlTree = this.router.parseUrl(this.router.url);
    return !!(
      urlTree.queryParams['theme'] || urlTree.queryParams['personality']
    );
  }

  /**
   * Clear theme parameters from URL
   */
  clearThemeFromUrl(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const queryParams = { ...urlTree.queryParams };

    delete queryParams['theme'];
    delete queryParams['personality'];

    this.router.navigate([], {
      queryParams,
      replaceUrl: true,
    });
  }

  /**
   * Initialize system theme detection
   */
  private initializeSystemThemeDetection(): void {
    // Check if user has manually set a theme preference
    const savedTheme = localStorage.getItem('playground-theme');
    
    if (!savedTheme) {
      // No manual preference, use system theme
      this.applySystemTheme();
    }
    
    // Listen for system theme changes
    this.listenForSystemThemeChanges();
  }

  /**
   * Apply system theme preference
   */
  private applySystemTheme(): void {
    const systemTheme: Theme = this.prefersDarkMode() ? 'dark' : 'light';
    this.applyTheme(systemTheme, false); // Don't update URL for system theme
  }

  /**
   * Check if system prefers dark mode
   */
  private prefersDarkMode(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  /**
   * Listen for system theme preference changes
   */
  private listenForSystemThemeChanges(): void {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          // Only auto-switch if user hasn't manually set a theme
          const savedTheme = localStorage.getItem('playground-theme');
          if (!savedTheme) {
            const systemTheme: Theme = e.matches ? 'dark' : 'light';
            this.applyTheme(systemTheme, false);
          }
        });
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveThemePreference(theme: Theme): void {
    localStorage.setItem('playground-theme', theme);
  }

  /**
   * Clear saved theme preference to allow system theme
   */
  clearThemePreference(): void {
    localStorage.removeItem('playground-theme');
    this.applySystemTheme();
  }
}
