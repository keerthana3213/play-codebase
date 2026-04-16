import {
  Component,
  signal,
  ViewEncapsulation,
  WritableSignal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService, Theme, Personality } from './services/theme.service';
@Component({
  selector: 'awe-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'playground';
  active = true;
  activeLink = signal<string>('');
  toggle: WritableSignal<boolean> = signal(true);
  appCategory = 'professional';

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    // Subscribe to theme changes to update UI state
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.active = theme === 'light';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setActiveLink(link: string): void {
    this.activeLink.set(link);
  }

  setAppCategory(category: string) {
    this.appCategory = category;
    if (category === 'minimal' || category === 'professional') {
      this.themeService.setPersonality(category as Personality);
    }
  }

  dark() {
    this.themeService.setTheme('dark');
  }

  light() {
    this.themeService.setTheme('light');
  }

  isActive(link: string): boolean {
    return this.activeLink() === link;
  }

  /**
   * Get current theme for template binding
   */
  get currentTheme(): Theme {
    return this.themeService.currentTheme;
  }

  /**
   * Toggle theme with URL sync
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Reset to system theme preference
   */
  resetToSystemTheme(): void {
    this.themeService.clearThemePreference();
  }
}
