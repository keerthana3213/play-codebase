import { AavaTooltipDirective } from './aava-tooltip.directive';
import { ElementRef, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

describe('TooltipDirective', () => {
  it('should create an instance', () => {
    const directive = new AavaTooltipDirective(
      {} as ViewContainerRef,
      {} as ComponentFactoryResolver,
      {} as Injector,
      {} as ElementRef
    );
    expect(directive).toBeTruthy();
  });
});
