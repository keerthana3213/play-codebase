import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonVariant,
  AavaTabsComponent,
  TabItem,
  AavaButtonComponent,
} from '@aava/play-core';

type ButtonMode = 'pill' | 'default' | 'action' | 'quick-action';
type ButtonFill = 'filled' | 'outline' | 'clear';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonConfig {
  mode: ButtonMode;
  fill: ButtonFill;
  size: ButtonSize;
  pill: boolean;
  outlined: boolean;
  clear: boolean;
  iconPosition?: 'left' | 'right' | 'only';
  iconName: string;
  label: string;
  available: boolean;
  iconColor?: string;
}

@Component({
  selector: 'aava-button-matrix-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent, AavaTabsComponent],
  template: `
    <div class="matrix-demo">
      <div class="demo-header">
        <!-- Matrix Table -->
        <div class="matrix-table-container">
          <!-- Size Headers -->
          <div id="size-tabs" class="size-tabs">
            <aava-tabs
              [tabs]="sizeTabs"
              [activeTabId]="selectedSize"
              variant="button"
              size="sm"
              [showContentPanels]="false"
              (tabChange)="onSizeTabChange($event)"
              class="size-tabs-container"
            ></aava-tabs>
          </div>

          <!-- Matrix Grid -->
          <div class="matrix-grid">
            <!-- Column Headers -->
            <div class="matrix-header">
              <div class="mode-header">Mode</div>
              <div class="fill-header" *ngFor="let fill of fills">
                {{ fill }}
              </div>
            </div>

            <!-- Matrix Rows -->
            <div class="matrix-row" *ngFor="let mode of modes">
              <div class="mode-label">{{ mode }}</div>

              <div class="button-cell" *ngFor="let fill of fills">
                <ng-container
                  *ngIf="getButtonConfig(mode, fill, selectedSize) as config"
                >
                  <aava-button
                    *ngIf="config.available"
                    [label]="config.label"
                    [pill]="config.pill"
                    [outlined]="config.outlined"
                    [clear]="config.clear"
                    [size]="getSizeMapping(selectedSize)"
                    [iconName]="config.iconName"
                    [iconPosition]="config.iconPosition || 'left'"
                    variant="primary"
                    class="matrix-button"
                  ></aava-button>

                  <div *ngIf="!config.available" class="unavailable">
                    ❌ Not Available
                  </div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./button-matrix-demo.component.scss'],
})
export class ButtonMatrixDemoComponent {
  isDarkTheme = false;

  modes: ButtonMode[] = ['pill', 'default', 'action', 'quick-action'];
  fills: ButtonFill[] = ['filled', 'outline', 'clear'];
  sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  sizeTabs: TabItem[] = [
    { id: 'xsmall', label: 'XSmall' },
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
    { id: 'xlarge', label: 'XLarge' },
  ];
  variants: ButtonVariant[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ];

  selectedSize: ButtonSize = 'md';
  selectedMode: ButtonMode = 'pill';
  selectedFill: ButtonFill = 'filled';

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.setAttribute(
      'data-theme',
      this.isDarkTheme ? 'dark' : 'light'
    );
  }

  onSizeTabChange(tab: TabItem): void {
    this.selectedSize = tab.id as ButtonSize;
  }

  getSizeLabel(size: ButtonSize): string {
    switch (size) {
      case 'xs':
        return 'XSmall';
      case 'sm':
        return 'Small';
      case 'md':
        return 'Medium';
      case 'lg':
        return 'Large';
      case 'xl':
        return 'XLarge';
      default:
        return size;
    }
  }

  getSizeMapping(
    size: ButtonSize
  ): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    switch (size) {
      case 'xs':
        return 'xs';
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      case 'xl':
        return 'xl';
      default:
        return 'md';
    }
  }

  getButtonConfig(
    mode: ButtonMode,
    fill: ButtonFill,
    size: ButtonSize
  ): ButtonConfig {
    // All fills are now available
    const baseConfig = {
      mode,
      fill,
      size,
      outlined: fill === 'outline',
      clear: fill === 'clear',
      available: true,
      iconColor: '#fff',
    };

    switch (mode) {
      case 'pill':
        return {
          ...baseConfig,
          pill: true,
          iconPosition: 'left' as const,
          iconName: 'star',
          label: 'Pill',
        };

      case 'default':
        return {
          ...baseConfig,
          pill: false,
          iconName: '',
          iconPosition: 'left' as const,
          label: 'Default',
        };

      case 'action':
        return {
          ...baseConfig,
          pill: false,
          iconPosition: 'left' as const,
          iconName: 'zap',
          label: 'Action',
        };

      case 'quick-action':
        return {
          ...baseConfig,
          pill: true,
          iconPosition: 'only' as const,
          iconName: 'plus',
          label: '',
        };

      default:
        return {
          ...baseConfig,
          pill: false,
          iconPosition: undefined,
          iconName: '',
          label: mode,
          available: false,
        };
    }
  }
}
