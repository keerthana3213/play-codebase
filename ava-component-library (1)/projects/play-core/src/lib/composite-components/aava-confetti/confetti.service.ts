import { Injectable, ComponentRef, ApplicationRef, EmbeddedViewRef, ComponentFactoryResolver, Injector, Type } from '@angular/core';
import { AavaConfettiComponent, ConfettiAnimation, ConfettiConfig } from './aava-confetti.component';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  private confettiComponent?: ComponentRef<AavaConfettiComponent>;
  private isInitialized = false;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  private initialize() {
    if (this.isInitialized) return;

    // Create component
    this.confettiComponent = this.componentFactoryResolver
      .resolveComponentFactory(AavaConfettiComponent)
      .create(this.injector);

    // Attach to the view
    this.appRef.attachView(this.confettiComponent.hostView);

    // Get DOM element and append to body
    const domElem = (this.confettiComponent.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.isInitialized = true;
  }

  trigger(animation: ConfettiAnimation, config: ConfettiConfig = {}) {
    if (!this.isInitialized) {
      this.initialize();
    }

    if (this.confettiComponent) {
      this.confettiComponent.instance.animation = animation;
      this.confettiComponent.instance.config = config;
      this.confettiComponent.instance.trigger();
    }
  }

  destroy() {
    if (this.confettiComponent) {
      this.confettiComponent.instance.stop();
      this.appRef.detachView(this.confettiComponent.hostView);
      this.confettiComponent.destroy();
      this.confettiComponent = undefined;
      this.isInitialized = false;
    }
  }
}
 