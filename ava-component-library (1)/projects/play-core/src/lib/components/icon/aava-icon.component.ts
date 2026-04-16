import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, Input, Output,
  EventEmitter, ViewEncapsulation,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

/**
 * Icon type prefixes
 */
const SVG_PREFIX = 'svg:';
const URL_PREFIX = 'url:';
@Component({
  selector: 'aava-icon',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './aava-icon.component.html',
  styleUrl: './aava-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.height.px]': 'iconSize',
    '[style.width.px]': 'iconSize',
    'style': 'display: inline-flex; align-items: center; justify-content: center; vertical-align: middle;'
  }
})
export class AavaIconComponent implements OnChanges, OnDestroy {
  @Input() iconName = '';
  @Input() disabled = false;
  @Input() iconColor = 'var(--icon-color)';
  @Input() iconSize: number | string = 24;
  @Input() cursor = false;
  @Input() cursorName = '';
  @Input() hoverColor = 'none';
  @Input() imgCustomStyle: Record<string, string> = {};
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaHidden: boolean | null = null;

  isHoverColor = true;
  @Output() userClick = new EventEmitter<Event>();
  @Output() iconError = new EventEmitter<Error>();

  iconType: 'name' | 'svg' | 'url' | 'unknown' = 'unknown';
  safeSvgContent = signal<SafeHtml | null>(null);
  iconUrl: string | null = null;
  isHover = false;
  isLoading = false;
  hasError = false;

  private fetchAbortController: AbortController | null = null;
  private isDestroyed = false;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }
  /**
   * Handles input changes
   */
  ngOnChanges(): void {
    if (this.hoverColor === 'none') {
      this.isHoverColor = false;
    }

    if (!this.iconName) {
      this.iconType = 'unknown';
      this.hasError = false;
      this.isLoading = false;
      return;
    }

    if (this.iconName.startsWith(SVG_PREFIX)) {
      this.iconType = 'svg';
      this.hasError = false;
      const svgContent = this.iconName.substring(SVG_PREFIX.length).trim();
      const cleanedSvg = this.cleanSvg(svgContent);
      this.safeSvgContent.set(
        this.sanitizer.bypassSecurityTrustHtml(cleanedSvg)
      );
      this.cdr.markForCheck();
    } else if (this.iconName.startsWith(URL_PREFIX)) {
      this.iconUrl = this.iconName.substring(URL_PREFIX.length).trim();
      if (this.isSvgFile(this.iconUrl)) {
        this.loadSvgFromUrl(this.iconUrl);
      } else {
        this.iconType = 'url';
        this.hasError = false;
        this.isLoading = false;
      }
    } else {
      this.iconType = 'name';
      this.hasError = false;
      this.isLoading = false;
    }
  }
  /**
   * Gets the computed color for the icon
   */
  get computedColor(): string {
    if (this.disabled && this.cursorName !== 'not-allowed') {
      return 'var(--button-icon-color-disabled)';
    }
    return this.iconColor;
  }

  /**
   * Handles click events on the icon
   */
  handleClick(event: Event): void {
    if (this.disabled || !this.cursor) {
      event.preventDefault();
      return;
    }
    this.userClick.emit(event);
  }

  /**
   * Handles image load errors
   */
  onImageError(): void {
    this.hasError = true;
    this.iconType = 'unknown';
    const error = new Error('Failed to load image');
    this.iconError.emit(error);
    this.cdr.markForCheck();
  }

  /**
   * Loads SVG content from a URL
   */
  private async loadSvgFromUrl(url: string): Promise<void> {
    if (this.fetchAbortController) {
      this.fetchAbortController.abort();
    }

    this.fetchAbortController = new AbortController();
    const currentAbortController = this.fetchAbortController;

    this.isLoading = true;
    this.hasError = false;
    this.iconType = 'svg';
    this.cdr.markForCheck();

    try {
      const response = await fetch(url, {
        signal: currentAbortController.signal
      });

      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      }

      const svgText = await response.text();

      if (this.isDestroyed || this.fetchAbortController !== currentAbortController) {
        return;
      }

      const cleanedSvg = this.cleanSvg(svgText);
      this.safeSvgContent.set(
        this.sanitizer.bypassSecurityTrustHtml(cleanedSvg)
      );
      this.isLoading = false;
      this.hasError = false;
      this.cdr.markForCheck();
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      const error = err instanceof Error ? err : new Error('Failed to load SVG');
      console.error('Failed to load SVG from URL:', url, error);

      if (!this.isDestroyed && this.fetchAbortController === currentAbortController) {
        this.hasError = true;
        this.isLoading = false;
        this.iconType = 'unknown';
        this.iconError.emit(error);
        this.cdr.markForCheck();
      }
    } finally {
      if (this.fetchAbortController === currentAbortController) {
        this.fetchAbortController = null;
      }
    }
  }

  /**
   * Checks if a path points to an SVG file
   */
  private isSvgFile(path: string): boolean {
    return path.toLowerCase().trim().endsWith('.svg');
  }

  /**
   * Cleans SVG content by removing width and height attributes
   * and ensures paths have fill attribute for proper rendering
   */
  private cleanSvg(svg: string): string {
    let cleaned = svg.trim();
    return cleaned;

    cleaned = cleaned.replace(/<svg\s+([^>]*)>/gi, (match: string, attributes: string) => {
      const cleanedAttributes = attributes
        .replace(/\s*(width|height)\s*=\s*"[^"]*"/g, '')
        .replace(/\s*(width|height)\s*=\s*'[^']*'/g, '');
      return `<svg ${cleanedAttributes}>`;
    });

    const uniqueId = `mask-${Math.random().toString(36).slice(2, 11)}`;
    const maskIdPattern = /mask\d+_[^"]*/i;
    
    let maskIdToReplace = '';
    
    cleaned = cleaned.replace(/id="([^"]*)"/gi, (match: string, id: string) => {
      if (maskIdPattern.test(id)) {
        maskIdToReplace = id;
        return `id="${uniqueId}"`;
      }
      return match;
    });
    
    if (maskIdToReplace) {
      const escapedId = maskIdToReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      cleaned = cleaned.replace(new RegExp(`url\\(#${escapedId}\\)`, 'gi'), `url(#${uniqueId})`);
    }

    cleaned = cleaned.replace(
      /<path\s+([^>]*)>/gi,
      (match: string, attributes: string) => {
        if (/fill\s*=/i.test(attributes)) {
          return match;
        }
        return `<path ${attributes} fill="currentColor">`;
      }
    );

    return cleaned;
  }

  /**
   * Gets the icon styles for the container
   */
  getIconStyles(): Record<string, string> {
    return {
      cursor: this.cursorName,
      ...this.customStyles
    };
  }

  /**
   * Gets the computed aria-label for accessibility
   */
  get computedAriaLabel(): string | null {
    return this.ariaLabel || null;
  }

  /**
   * Gets whether the icon should be hidden from screen readers
   */
  get isAriaHidden(): boolean {
    if (this.ariaHidden !== null) {
      return this.ariaHidden;
    }
    return !this.ariaLabel && !this.ariaLabelledby && !this.cursor;
  }

  /**
   * Cleanup on component destruction
   */
  ngOnDestroy(): void {
    this.isDestroyed = true;

    if (this.fetchAbortController) {
      this.fetchAbortController.abort();
      this.fetchAbortController = null;
    }
  }
}