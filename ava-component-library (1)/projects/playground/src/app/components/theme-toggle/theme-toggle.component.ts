import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-toggle-container">
      <div class="theme-toggle-buttons">
        <button 
          class="theme-btn light" 
          [class.active]="currentTheme === 'light'"
          (click)="setTheme('light')"
          title="Light Theme">
          ☀️ Light
        </button>
        <button 
          class="theme-btn dark" 
          [class.active]="currentTheme === 'dark'"
          (click)="setTheme('dark')"
          title="Dark Theme">
          🌙 Dark
        </button>
        <button 
          class="theme-btn system" 
          [class.active]="isSystemTheme"
          (click)="resetToSystemTheme()"
          title="System Theme">
          🖥️ System
        </button>
      </div>
    </div>
  `,
  styles: [`
    .theme-toggle-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .theme-toggle-buttons {
      display: flex;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .theme-btn {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      background: rgba(255, 255, 255, 0.1);
      color: #374151;
      min-height: 36px;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
      }

      &.active {
        background: #6366f1;
        color: white;
        border-color: #6366f1;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }

      &.light {
        &:hover:not(.active) {
          background: #fbbf24;
          color: #92400e;
        }
      }

      &.dark {
        &:hover:not(.active) {
          background: #7c3aed;
          color: white;
        }
      }

      &.system {
        &:hover:not(.active) {
          background: #06b6d4;
          color: white;
        }
      }
    }

    @media (max-width: 768px) {
      .theme-toggle-buttons {
        flex-direction: column;
        gap: 0.25rem;
      }
      
      .theme-btn {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }
    }
  `]
})
export class ThemeToggleComponent {
  currentTheme: Theme = 'light';
  isSystemTheme = false;

  constructor(private themeService: ThemeService) {
    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      // Check if this is a system theme (no manual preference)
      const savedTheme = localStorage.getItem('playground-theme');
      this.isSystemTheme = !savedTheme;
    });
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  resetToSystemTheme(): void {
    this.themeService.clearThemePreference();
  }
}
