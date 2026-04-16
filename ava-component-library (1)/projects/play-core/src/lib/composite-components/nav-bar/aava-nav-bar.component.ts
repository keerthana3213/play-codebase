import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Simplified container styles interface
export interface NavBarContainerStyles {
  background?: string;
  padding?: string;
  borderRadius?: string;
  boxShadow?: string;
  border?: string;
  gap?: string;
  outerGlow?: boolean;
  outerGlowColor?: string;
  outerGlowIntensity?: string;
  width?: string;
  height?: string;
  backdropFilter?: string;
}

@Component({
  selector: 'aava-nav-bar',
  templateUrl: './aava-nav-bar.component.html',
  styleUrls: ['./aava-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class AavaNavBarComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() containerStyles: NavBarContainerStyles = {};

  get computedStyles(): Record<string, string> {
    const styles = this.containerStyles;

    return {
      // Apply container styles
      ...(styles.background && { background: styles.background }),
      ...(styles.padding && { padding: styles.padding }),
      ...(styles.borderRadius && { 'border-radius': styles.borderRadius }),
      ...(styles.boxShadow && { 'box-shadow': styles.boxShadow }),
      ...(styles.border && { border: styles.border }),
      ...(styles.gap && { gap: styles.gap }),
      ...(styles.width && { width: styles.width }),
      ...(styles.height && { height: styles.height }),
      ...(styles.backdropFilter && {
        'backdrop-filter': styles.backdropFilter,
      }),

      // Outer glow effect
      ...(styles.outerGlow && {
        'box-shadow': `0 0 ${styles.outerGlowIntensity || '20px'} ${
          styles.outerGlowColor || 'rgba(var(--rgb-brand-primary), 0.3)'
        }, ${styles.boxShadow || 'var(--global-elevation-02)'}`,
      }),
    };
  }
}
