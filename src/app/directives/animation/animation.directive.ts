import { Directive, ElementRef, Input, afterNextRender } from '@angular/core';
import { animate, AnimationOptions, DOMKeyframesDefinition, hover } from 'motion';

interface IAnimation {
  isHover?: boolean;
  selector?: string;
  keyframes: DOMKeyframesDefinition;
  options?: AnimationOptions;
  callbackKeyframes?: DOMKeyframesDefinition;
  callbackOptions?: AnimationOptions;
}

@Directive({
  selector: '[vdAnimation]',
})
export class AnimationDirective {
  @Input('vdAnimation') config!: IAnimation;

  constructor(private el: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      const targetEl = this.el.nativeElement;
      const targetSelector = this.config?.selector || '';

      if (targetEl) {
        if (this.config?.isHover) {
          hover(targetEl, (element) => {
            const hoverEl = element.querySelectorAll(targetSelector);
            animate(hoverEl, this.config.keyframes, this.config.options);
            return () =>
              animate(
                hoverEl,
                this.config?.callbackKeyframes as DOMKeyframesDefinition,
                this.config.options,
              );
          });
        } else {
          animate(targetEl, this.config.keyframes, this.config.options);
        }
      }
    });
  }
}
