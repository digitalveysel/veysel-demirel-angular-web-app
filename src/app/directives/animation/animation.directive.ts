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
      const tSelector = this.vdConfig?.selector;
      const nEl = this.el.nativeElement;
      const tEl = tSelector ? nEl.querySelectorAll(tSelector) : nEl;

      if (tEl) {
        const aType = this.vdConfig.type;
        if (aType) {
          switch (aType) {
            case IAnimationTypes.PURE:
              animate(tEl, this.vdConfig.keyframes, this.vdConfig.options);
              break;

            case IAnimationTypes.HOVER:
              hover(tEl, () => {
                animate(tEl, this.vdConfig.keyframes, this.vdConfig.options);
                return () =>
                  animate(
                    tEl,
                    this.vdConfig?.callbackKeyframes as DOMKeyframesDefinition,
                    this.vdConfig.callbackOptions,
                  );
              });
              break;

            case IAnimationTypes.IN_VIEW:
              inView(tEl, () => {
                animate(tEl, this.vdConfig.keyframes, this.vdConfig.options);
                return () =>
                  animate(
                    tEl,
                    this.vdConfig?.callbackKeyframes as DOMKeyframesDefinition,
                    this.vdConfig.callbackOptions,
                  );
              });
              break;

            default:
              animate(tEl, this.vdConfig.keyframes, this.vdConfig.options);
              break;
          }
        } else {
          animate(tEl, this.vdConfig.keyframes, this.vdConfig.options);
        }
      }
    });
  }
}
