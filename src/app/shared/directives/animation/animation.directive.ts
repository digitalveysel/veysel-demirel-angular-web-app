import { Directive, ElementRef, Input, afterNextRender } from '@angular/core';
import { animate, AnimationOptions, DOMKeyframesDefinition } from 'motion';

@Directive({
  selector: '[vdAnimation]',
})
export class AnimationDirective {
  @Input('vdAnimation') config!: {
    selector?: string;
    keyframes: DOMKeyframesDefinition;
    options?: AnimationOptions;
  };

  constructor(private el: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      const targetSelector = this.config?.selector;
      const targets = targetSelector
        ? this.el.nativeElement.querySelectorAll(targetSelector)
        : [this.el.nativeElement];

      targets.forEach((target) => {
        if (target) animate(target, this.config.keyframes, this.config.options);
      });
    });
  }
}
