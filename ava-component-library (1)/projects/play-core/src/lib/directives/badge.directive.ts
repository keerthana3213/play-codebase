import {
  Directive,
  ElementRef,
  Input,
  ComponentRef,
  ViewContainerRef,
  Injector,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  Renderer2
} from '@angular/core';
import { AavaBadgesComponent } from '../components/badges/aava-badges.component';

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgePosition = 'before' | 'after';
type BadgeState = 'high-priority' | 'medium-priority' | 'low-priority' | 'neutral' | 'information' | 'online' | 'offline';

@Directive({
  selector: '[aavaBadge]',
  standalone: true
})
export class AavaBadgeDirective implements OnInit, OnDestroy, OnChanges {
  @Input() aavaBadgeSize: BadgeSize = 'md';
  @Input() aavaBadgePosition: BadgePosition = 'after';
  @Input() aavaBadgeOverlap: boolean = true;
  @Input() aavaBadgeHidden: boolean = false;
  @Input() aavaBadgeCount?: number;
  @Input() aavaBadgeState: BadgeState = 'high-priority';
  @Input() aavaBadgeInline: boolean = false;

  private badgeRef: ComponentRef<AavaBadgesComponent> | null = null;

  // Offset configurations for different badge sizes and types
  private readonly offsetConfig = {
    sm: { dot: { overlap: '-1px', noOverlap: '-4px' }, count: { overlap: '-4px', noOverlap: '-6px' } },
    md: { dot: { overlap: '-1px', noOverlap: '-5px' }, count: { overlap: '-6px', noOverlap: '-10px' } },
    lg: { dot: { overlap: '-3px', noOverlap: '-8px' }, count: { overlap: '-12px', noOverlap: '-20px' } }
  };

  // Margin configurations for inline badges
  private readonly marginConfig = { sm: '4px', md: '6px', lg: '8px' };

  // Transform configurations for dot badges
  private readonly transformConfig = { sm: 'translateY(-1px)', md: 'translateY(-2px)', lg: 'translateY(-2px)' };

  constructor(
    private el: ElementRef,
    private vcRef: ViewContainerRef,
    private injector: Injector,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setupHostElement();
    this.createBadge();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.badgeRef) {
      if (changes['aavaBadgeHidden']) {
        changes['aavaBadgeHidden'].currentValue ? this.destroyBadge() : this.createBadge();
      } else {
        this.updateBadge();
        this.styleBadge();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyBadge();
  }

  private setupHostElement(): void {
    const hostElement = this.el.nativeElement;
    this.renderer.setStyle(hostElement, 'position', 'relative');
    this.renderer.setStyle(hostElement, 'display', 'inline-block');
  }

  private createBadge(): void {
    if (this.badgeRef || this.aavaBadgeHidden) return;

    this.badgeRef = this.vcRef.createComponent(AavaBadgesComponent, {
      injector: this.injector,
    });

    const badgeElement = this.badgeRef.location.nativeElement;
    const hostElement = this.el.nativeElement;

    if (this.aavaBadgeInline) {
      this.insertInlineBadge(hostElement, badgeElement);
    } else {
      hostElement.appendChild(badgeElement);
    }

    this.updateBadge();
    this.styleBadge();
    this.badgeRef.changeDetectorRef.detectChanges();
  }

  private insertInlineBadge(hostElement: HTMLElement, badgeElement: HTMLElement): void {
    if (this.aavaBadgePosition === 'before') {
      this.renderer.insertBefore(hostElement, badgeElement, hostElement.firstChild);
    } else {
      this.renderer.appendChild(hostElement, badgeElement);
    }
  }

  private updateBadge(): void {
    if (!this.badgeRef) return;

    const badge = this.badgeRef.instance;
    badge.size = this.aavaBadgeSize;
    badge.state = this.aavaBadgeState;
    badge.count = this.aavaBadgeCount;
    badge.variant = this.aavaBadgeCount !== undefined ? 'default' : 'dots';

    this.badgeRef.changeDetectorRef.detectChanges();
  }

  private styleBadge(): void {
    if (!this.badgeRef) return;

    const badgeElement = this.badgeRef.location.nativeElement;
    const isDotBadge = this.aavaBadgeCount === undefined || this.aavaBadgeCount === null;

    if (this.aavaBadgeInline) {
      this.applyInlineStyles(badgeElement, isDotBadge);
    } else {
      this.applyAbsoluteStyles(badgeElement, isDotBadge);
    }
  }

  private applyInlineStyles(badgeElement: HTMLElement, isDotBadge: boolean): void {
    this.renderer.setStyle(badgeElement, 'position', 'relative');
    this.renderer.setStyle(badgeElement, 'display', 'inline-block');
    this.renderer.setStyle(badgeElement, 'z-index', '10');

    if (isDotBadge) {
      this.renderer.setStyle(badgeElement, 'vertical-align', 'baseline');
      this.renderer.setStyle(badgeElement, 'transform', this.transformConfig[this.aavaBadgeSize]);
    } else {
      this.renderer.setStyle(badgeElement, 'vertical-align', 'middle');
    }

    this.applyMargin(badgeElement);
  }

  private applyMargin(badgeElement: HTMLElement): void {
    const marginSize = this.marginConfig[this.aavaBadgeSize];
    const marginProperty = this.aavaBadgePosition === 'before' ? 'margin-right' : 'margin-left';
    const removeProperty = this.aavaBadgePosition === 'before' ? 'margin-left' : 'margin-right';

    this.renderer.setStyle(badgeElement, marginProperty, marginSize);
    this.renderer.removeStyle(badgeElement, removeProperty);
  }

  private applyAbsoluteStyles(badgeElement: HTMLElement, isDotBadge: boolean): void {
    this.renderer.setStyle(badgeElement, 'position', 'absolute');
    this.renderer.setStyle(badgeElement, 'z-index', '10');

    const offsets = this.getOffsets(isDotBadge);
    this.renderer.setStyle(badgeElement, 'top', offsets.top);

    if (this.aavaBadgePosition === 'before') {
      this.renderer.setStyle(badgeElement, 'left', offsets.side);
      this.renderer.removeStyle(badgeElement, 'right');
    } else {
      this.renderer.setStyle(badgeElement, 'right', offsets.side);
      this.renderer.removeStyle(badgeElement, 'left');
    }
  }

  private getOffsets(isDotBadge: boolean): { top: string; side: string } {
    const sizeConfig = this.offsetConfig[this.aavaBadgeSize];
    const typeConfig = isDotBadge ? sizeConfig.dot : sizeConfig.count;
    const offset = this.aavaBadgeOverlap ? typeConfig.overlap : typeConfig.noOverlap;

    return { top: offset, side: offset };
  }

  private destroyBadge(): void {
    if (this.badgeRef) {
      this.badgeRef.destroy();
      this.badgeRef = null;
    }
  }
}
