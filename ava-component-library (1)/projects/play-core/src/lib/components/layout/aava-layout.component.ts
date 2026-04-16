import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'aava-layout',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-layout.component.html',
  styleUrl: './aava-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaLayoutComponent implements OnInit, OnDestroy {
  @Input() headerHeight = '100px';
  @Input() leftPanelWidth = '100px';
  @Input() rightPanelWidth = '300px';
  @Input() footerHeight = '60px';
  @Input() footerText = '';
  @Input() footerMode: 'sticky' | 'scrollable' = 'sticky';

  @Input() showHeader = true;
  @Input() showLeftPanel = true;
  @Input() showRightPanel = true;
  @Input() showFooter = true;
  @Input() leftPanelOpen = false;
  @Input() rightPanelOpen = false;

  // Custom icon names for toggle buttons
  @Input() leftPanelOpenIcon = 'panel-right-close';
  @Input() leftPanelClosedIcon = 'panel-right-open';
  @Input() rightPanelOpenIcon = 'panel-right-open';
  @Input() rightPanelClosedIcon = 'panel-right-close';
  @Input() leftPanelTriggerTop = '70%';
  @Input() customStyles: Record<string, string> = {};

  @Output() leftPanelOpenChange = new EventEmitter<boolean>();
  @Output() rightPanelOpenChange = new EventEmitter<boolean>();

  // Theme-aware icon colors
  @Input() headerIconColor = 'var(--color-text-on-primary)';
  currentTheme: Theme = 'default';

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.currentTheme = theme;
        this.updateIconColors();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateIconColors(): void {
    // Update icon colors based on current theme
    switch (this.currentTheme) {
      case 'dark':
      case 'console':
        this.headerIconColor = 'var(--color-text-on-primary)';
        break;
      case 'light':
      case 'default':
        this.headerIconColor = 'var(--color-text-primary)';
        break;
      case 'modern-vibrant':
        this.headerIconColor = 'var(--color-text-on-primary)';
        break;
      case 'acme':
      case 'enterprise':
      case 'corporate':
        this.headerIconColor = 'var(--color-text-primary)';
        break;
      default:
        this.headerIconColor = 'var(--color-text-primary)';
    }
  }

  toggleLeftPanel(): void {
    this.leftPanelOpen = !this.leftPanelOpen;
    this.leftPanelOpenChange.emit(this.leftPanelOpen);
  }

  toggleRightPanel(): void {
    this.rightPanelOpen = !this.rightPanelOpen;
    this.rightPanelOpenChange.emit(this.rightPanelOpen);
  }
}
