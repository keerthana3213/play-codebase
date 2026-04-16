import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme =
  | 'default'
  | 'light'
  | 'modern-vibrant'
  | 'dark'
  | 'console'
  | 'acme'
  | 'enterprise'
  | 'corporate';

export interface ThemeInfo {
  name: Theme;
  displayName: string;
  description: string;
  category: 'default' | 'dark' | 'acme';
  primaryColor: string;
  secondaryColor: string;
  characteristics: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>('default');
  public currentTheme$: Observable<Theme> =
    this.currentThemeSubject.asObservable();

  private readonly themes: Record<Theme, ThemeInfo> = {
    // Default Category
    default: {
      name: 'default',
      displayName: 'Default',
      description: 'Classic pink and blue color scheme - the foundation theme',
      category: 'default',
      primaryColor: '#e91e63',
      secondaryColor: '#2196f3',
      characteristics: [
        '🎨 Classic Pink Primary',
        '🔵 Blue Secondary',
        '✨ Balanced Design',
        '📱 Universal Appeal',
      ],
    },
    light: {
      name: 'light',
      displayName: 'Light',
      description: 'Bright light theme with vibrant pink primary colors',
      category: 'default',
      primaryColor: '#e91e63',
      secondaryColor: '#2196f3',
      characteristics: [
        '🌟 Bright Backgrounds',
        '🎨 Vibrant Pink',
        '📝 High Contrast',
        '✨ Modern Feel',
      ],
    },
    'modern-vibrant': {
      name: 'modern-vibrant',
      displayName: 'Modern Vibrant',
      description:
        'Bold electric purple and neon green for modern applications',
      category: 'default',
      primaryColor: '#9333ea',
      secondaryColor: '#4ade80',
      characteristics: [
        '💜 Electric Purple',
        '🟢 Neon Green',
        '⚡ High Energy',
        '🎯 Modern Appeal',
      ],
    },

    // Dark Category
    dark: {
      name: 'dark',
      displayName: 'Dark',
      description: 'Sophisticated dark theme with royal blue primary colors',
      category: 'dark',
      primaryColor: '#2563eb',
      secondaryColor: '#03bdd4',
      characteristics: [
        '🌙 Dark Backgrounds',
        '🔵 Royal Blue',
        '👁️ Reduced Eye Strain',
        '💼 Professional Look',
      ],
    },
    console: {
      name: 'console',
      displayName: 'Console',
      description:
        'Developer-focused theme with electric blue and terminal green',
      category: 'dark',
      primaryColor: '#60a5fa',
      secondaryColor: '#4ade80',
      characteristics: [
        '💻 Developer Optimized',
        '🔵 Electric Blue',
        '🟢 Terminal Green',
        '📊 High Readability',
      ],
    },

    // ACME Category
    acme: {
      name: 'acme',
      displayName: 'ACME',
      description: 'Professional theme with deep purple and emerald green',
      category: 'acme',
      primaryColor: '#7c3aed',
      secondaryColor: '#059669',
      characteristics: [
        '🏢 Deep Purple',
        '🟢 Emerald Green',
        '💼 Business Ready',
        '🎯 Enterprise Focus',
      ],
    },
    enterprise: {
      name: 'enterprise',
      displayName: 'Enterprise',
      description:
        'Corporate theme with navy blue and teal for sophisticated business',
      category: 'acme',
      primaryColor: '#1e293b',
      secondaryColor: '#0d9488',
      characteristics: [
        '🔵 Navy Blue',
        '🟢 Teal Accent',
        '🏛️ Formal Design',
        '📈 Enterprise Grade',
      ],
    },
    corporate: {
      name: 'corporate',
      displayName: 'Corporate',
      description: 'Formal business theme with charcoal gray and gold accents',
      category: 'acme',
      primaryColor: '#1f2937',
      secondaryColor: '#d97706',
      characteristics: [
        '⚫ Charcoal Gray',
        '🟡 Gold Accent',
        '🎩 Conservative Design',
        '🏢 Corporate Ready',
      ],
    },
  };

  constructor() {
    this.init();
  }

  private init(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && this.themes[savedTheme]) {
      // User has manually set a theme preference
      this.setTheme(savedTheme);
    } else {
      // No manual preference, use system theme
      this.applySystemTheme();
    }
    
    // Listen for system theme changes
    this.listenForSystemThemeChanges();
  }

  /**
   * Set the current theme
   */
  setTheme(theme: Theme): void {
    if (!this.themes[theme]) {
      console.warn(`Theme "${theme}" not found, falling back to default theme`);
      theme = 'default';
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentThemeSubject.next(theme);

    // Dispatch theme change event
    window.dispatchEvent(
      new CustomEvent('themeChange', {
        detail: { theme, themeInfo: this.themes[theme] },
      })
    );
  }

  /**
   * Get the current theme
   */
  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  /**
   * Get information about the current theme
   */
  getCurrentThemeInfo(): ThemeInfo {
    return this.themes[this.getCurrentTheme()];
  }

  /**
   * Get information about all available themes
   */
  getAllThemes(): Record<Theme, ThemeInfo> {
    return this.themes;
  }

  /**
   * Get themes by category
   */
  getThemesByCategory(category: 'default' | 'dark' | 'acme'): ThemeInfo[] {
    return Object.values(this.themes).filter(
      (theme) => theme.category === category
    );
  }

  /**
   * Get information about a specific theme
   */
  getThemeInfo(theme: Theme): ThemeInfo | null {
    return this.themes[theme] || null;
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const newTheme: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Cycle through all available themes
   */
  cycleTheme(): void {
    const themeOrder: Theme[] = [
      'default',
      'light',
      'modern-vibrant',
      'dark',
      'console',
      'acme',
      'enterprise',
      'corporate',
    ];
    const currentIndex = themeOrder.indexOf(this.getCurrentTheme());
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    this.setTheme(themeOrder[nextIndex]);
  }

  /**
   * Check if a theme is currently active
   */
  isThemeActive(theme: Theme): boolean {
    return this.getCurrentTheme() === theme;
  }

  /**
   * Get the next theme in the cycle
   */
  getNextTheme(): Theme {
    const themeOrder: Theme[] = [
      'default',
      'light',
      'modern-vibrant',
      'dark',
      'console',
      'acme',
      'enterprise',
      'corporate',
    ];
    const currentIndex = themeOrder.indexOf(this.getCurrentTheme());
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    return themeOrder[nextIndex];
  }

  /**
   * Get the previous theme in the cycle
   */
  getPreviousTheme(): Theme {
    const themeOrder: Theme[] = [
      'default',
      'light',
      'modern-vibrant',
      'dark',
      'console',
      'acme',
      'enterprise',
      'corporate',
    ];
    const currentIndex = themeOrder.indexOf(this.getCurrentTheme());
    const prevIndex =
      currentIndex === 0 ? themeOrder.length - 1 : currentIndex - 1;
    return themeOrder[prevIndex];
  }

  /**
   * Reset theme to default
   */
  resetTheme(): void {
    this.setTheme('default');
  }

  /**
   * Check if system prefers dark mode
   */
  prefersDarkMode(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  /**
   * Listen for system theme preference changes
   */
  listenForSystemThemeChanges(): void {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const systemTheme: Theme = e.matches ? 'dark' : 'light';
          // Only auto-switch if user hasn't manually set a theme
          const savedTheme = localStorage.getItem('theme');
          if (!savedTheme) {
            this.setTheme(systemTheme);
          }
        });
    }
  }

  /**
   * Apply system theme preference
   */
  private applySystemTheme(): void {
    const systemTheme: Theme = this.prefersDarkMode() ? 'dark' : 'light';
    this.setTheme(systemTheme);
  }

  /**
   * Clear saved theme preference to allow system theme
   */
  clearThemePreference(): void {
    localStorage.removeItem('theme');
    this.applySystemTheme();
  }
}
