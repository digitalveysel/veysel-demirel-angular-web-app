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
  @Input('vdAnimation') vdConfig!: IAnimation;

  constructor(private el: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      const targetEl = this.el.nativeElement;
      const targetSelector = this.vdConfig?.selector || '';

      if (targetEl) {
        if (this.vdConfig?.isHover) {
          hover(targetEl, (element) => {
            const hoverEl = element.querySelectorAll(targetSelector);
            animate(hoverEl, this.vdConfig.keyframes, this.vdConfig.options);
            return () =>
              animate(
                hoverEl,
                this.vdConfig?.callbackKeyframes as DOMKeyframesDefinition,
                this.vdConfig.options,
              );
          });
        } else {
          animate(targetEl, this.vdConfig.keyframes, this.vdConfig.options);
        }
      }
    });
  }
}
