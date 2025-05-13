import { Directive, ElementRef, Input, afterNextRender } from '@angular/core';
import { animate, DOMKeyframesDefinition, hover, inView } from 'motion';
import { IAnimation, IAnimationTypes } from '../../core/models/animation.model';

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
        const aType = this.vdConfig.type;
        if (aType) {
          switch (this.vdConfig.type) {
            case IAnimationTypes.PURE:
              animate(targetEl, this.vdConfig.keyframes, this.vdConfig.options);
              break;

            case IAnimationTypes.HOVER:
              hover(targetEl, (element) => {
                const aEl = element.querySelectorAll(targetSelector) || element;
                animate(aEl, this.vdConfig.keyframes, this.vdConfig.options);
                return () =>
                  animate(
                    aEl,
                    this.vdConfig?.callbackKeyframes as DOMKeyframesDefinition,
                    this.vdConfig.options,
                  );
              });
              break;

            case IAnimationTypes.IN_VIEW:
              inView(targetEl, (element) => {
                const aEl = element.querySelectorAll(targetSelector) || element;
                animate(aEl, this.vdConfig.keyframes, this.vdConfig.options);
                return () =>
                  animate(
                    aEl,
                    this.vdConfig?.callbackKeyframes as DOMKeyframesDefinition,
                    this.vdConfig.options,
                  );
              });
              break;

            default:
              animate(targetEl, this.vdConfig.keyframes, this.vdConfig.options);
              break;
          }
        } else {
          animate(targetEl, this.vdConfig.keyframes, this.vdConfig.options);
        }
      }
    });
  }
}
