import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ThemeService,
  Theme,
  ThemeInfo,
} from '@aava/play-core';

// Import Play+ components
import { AavaButtonComponent } from '@aava/play-core';
import { AavaTextboxComponent } from '@aava/play-core';
import { AavaTextareaComponent } from '@aava/play-core';
import { AavaCheckboxComponent } from '@aava/play-core';
import { AavaRadioButtonComponent } from '@aava/play-core';
import { AavaCardComponent } from '@aava/play-core';
import { AavaToggleComponent } from '@aava/play-core';
import { AavaSliderComponent } from '@aava/play-core';
import { AavaLinkComponent } from '@aava/play-core';
import { AavaBadgesComponent } from '@aava/play-core';
import {
  AavaTabsComponent,
  TabItem,
} from '@aava/play-core';
import { AavaSpinnerComponent } from '@aava/play-core';
import { AavaProgressComponent } from '@aava/play-core';

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'app-theme-preview',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    AavaTextboxComponent,
    AavaTextareaComponent,
    AavaCheckboxComponent,
    AavaRadioButtonComponent,
    AavaCardComponent,
    AavaToggleComponent,
    AavaSliderComponent,
    AavaLinkComponent,
    AavaBadgesComponent,
    AavaTabsComponent,
    AavaSpinnerComponent,
    AavaProgressComponent,
  ],
  templateUrl: './app-theme-preview.component.html',
  styleUrls: ['./app-theme-preview.component.scss'],
})
export class AppThemePreviewComponent implements OnInit {
  loading = true;
  currentTheme: Theme = 'default';
  themes: ThemeInfo[] = [];

  // Demo data for components
  dropdownOptions = [
    { name: 'Option 1', value: '1' },
    { name: 'Option 2', value: '2' },
    { name: 'Option 3', value: '3' },
  ];

  radioOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  tabItems: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content:
        '<p>Theme overview and general information about the design system. Explore how different themes affect the visual appearance of components.</p>',
      iconName: 'home',
    },
    {
      id: 'components',
      label: 'Components',
      content:
        '<p>Interactive component showcase with current theme applied. See how buttons, forms, cards, and other elements adapt to theme changes.</p>',
      iconName: 'layers',
    },
    {
      id: 'settings',
      label: 'Settings',
      content:
        '<p>Theme configuration and customization options. Switch between different theme variants and see real-time changes.</p>',
      iconName: 'settings',
    },
  ];

  activeTabId = 'overview';

  accordionItems = [
    { title: 'Accordion Item 1', content: 'Content for accordion item 1' },
    { title: 'Accordion Item 2', content: 'Content for accordion item 2' },
    { title: 'Accordion Item 3', content: 'Content for accordion item 3' },
  ];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.loading = true;
    this.themes = Object.values(this.themeService.getAllThemes());
    this.currentTheme = this.themeService.getCurrentTheme();
    this.loading = false;
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  cycleTheme() {
    this.themeService.cycleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  getCurrentThemeInfo(): ThemeInfo {
    return this.themeService.getCurrentThemeInfo();
  }

  isThemeActive(themeName: Theme): boolean {
    return this.currentTheme === themeName;
  }

  getThemeArray(): ThemeInfo[] {
    return this.themes;
  }

  getThemesByCategory(category: 'default' | 'dark' | 'acme'): ThemeInfo[] {
    return this.themeService.getThemesByCategory(category);
  }

  getUseCase(themeName: Theme): string {
    const useCases: Record<Theme, string> = {
      default: 'General applications, marketing sites',
      light: 'Daytime interfaces, productivity apps',
      'modern-vibrant': 'Creative platforms, modern apps',
      dark: 'Nighttime interfaces, media apps',
      console: 'Developer tools, code editors',
      acme: 'Professional business platforms',
      enterprise: 'Corporate applications, B2B',
      corporate: 'Formal business environments',
    };
    return useCases[themeName] || 'General purpose';
  }
}
