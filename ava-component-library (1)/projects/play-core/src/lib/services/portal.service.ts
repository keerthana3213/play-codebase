import { Injectable, ApplicationRef, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private portalHost: HTMLElement | null = null;

  constructor(private appRef: ApplicationRef, private injector: Injector) {
    this.createPortalHost();
  }

  private createPortalHost(): void {
    if (!this.portalHost) {
      this.portalHost = document.createElement('div');
      this.portalHost.id = 'portal-host';
      this.portalHost.style.position = 'absolute';
      this.portalHost.style.top = '0';
      this.portalHost.style.left = '0';
      this.portalHost.style.zIndex = '9999';
      this.portalHost.style.pointerEvents = 'none';
      document.body.appendChild(this.portalHost);
    }
  }

  attachElement(element: HTMLElement): void {
    if (this.portalHost) {
      element.style.pointerEvents = 'auto';
      this.portalHost.appendChild(element);
    }
  }

  detachElement(element: HTMLElement): void {
    if (this.portalHost && this.portalHost.contains(element)) {
      this.portalHost.removeChild(element);
    }
  }

  getPortalHost(): HTMLElement | null {
    return this.portalHost;
  }
}
