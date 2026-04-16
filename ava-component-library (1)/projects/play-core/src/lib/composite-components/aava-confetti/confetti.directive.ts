import { Directive, ElementRef, Input, ViewContainerRef, ComponentRef, OnDestroy, ApplicationRef, Injector } from '@angular/core';
import { AavaConfettiComponent, ConfettiAnimation, ConfettiConfig } from './aava-confetti.component';

@Directive({
  selector: '[aavaConfetti]',
  standalone: true
})
export class ConfettiDirective implements OnDestroy {
  @Input() aavaConfetti: ConfettiAnimation = 'explosions';
  @Input() confettiConfig: ConfettiConfig = {};
  @Input() confettiTrigger: 'click' | 'hover' | 'focus' = 'click';

  private static confettiComponent?: ComponentRef<AavaConfettiComponent>;
  private handler: (() => void) | null = null;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private appRef: ApplicationRef
  ) {
    this.setupTrigger();
  }

  ngOnDestroy() {
    if (this.handler) {
      this.el.nativeElement.removeEventListener(
        this.getEventName(this.confettiTrigger),
        this.handler
      );
    }
  }

  private getEventName(trigger: 'click' | 'hover' | 'focus'): string {
    switch (trigger) {
      case 'hover':
        return 'mouseenter';
      default:
        return trigger;
    }
  }

  private setupTrigger() {
    this.handler = () => this.triggerConfetti();
    this.el.nativeElement.addEventListener(
      this.getEventName(this.confettiTrigger),
      this.handler
    );
  }

  private ensureConfettiExists() {
    if (!ConfettiDirective.confettiComponent) {
      // Create component with correct positioning
      ConfettiDirective.confettiComponent = this.vcr.createComponent(AavaConfettiComponent);
      const element = ConfettiDirective.confettiComponent.location.nativeElement;
      
      // Add to body right away for proper positioning
      document.body.appendChild(element);
    }
    return ConfettiDirective.confettiComponent;
  }

  private triggerConfetti() {
    const confetti = this.ensureConfettiExists();
    if (confetti) {
      confetti.instance.animation = this.aavaConfetti;
      confetti.instance.config = this.confettiConfig;
      confetti.instance.trigger();
    }
  }
}