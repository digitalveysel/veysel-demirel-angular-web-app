import { Directive, ElementRef, Input, afterNextRender } from '@angular/core';
import {
  animate,
  AnimationOptions,
  DOMKeyframesDefinition,
  EventOptions,
  hover,
  inView,
} from 'motion';
import { IAnimation, IAnimationTypes, IInViewOptions } from '../../core/models/animation.model';

@Directive({
  selector: '[vdAnimation]',
})
export class AnimationDirective {
  @Input('vdAnimation') vdConfig!: IAnimation;

  constructor(private el: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      if (!this.vdConfig) return;
      this.createAnimation();
    });
  }

  private createAnimation(): void {
    const nEl = this.el.nativeElement;
    const tSelector = this.vdConfig.selector;
    const tEl = tSelector ? nEl.querySelectorAll(tSelector) : nEl;
    const aType = this.vdConfig.type;

    switch (aType) {
      case IAnimationTypes.PURE:
        this.createPureAnimation(tEl, this.vdConfig.keyframes, this.vdConfig.options);
        break;

      case IAnimationTypes.HOVER:
        this.createHoverAnimation(
          tEl,
          this.vdConfig.keyframes,
          this.vdConfig.callbackKeyframes,
          this.vdConfig.options,
          this.vdConfig.callbackOptions,
        );
        break;

      case IAnimationTypes.IN_VIEW:
        this.createInViewAnimation(
          tEl,
          this.vdConfig.keyframes,
          this.vdConfig.callbackKeyframes,
          this.vdConfig.options,
          this.vdConfig.callbackOptions,
        );
        break;

      default:
        this.createPureAnimation(tEl, this.vdConfig.keyframes, this.vdConfig.options);
        break;
    }
  }

  private createPureAnimation(
    el: HTMLElement | NodeListOf<Element>,
    keyframes: DOMKeyframesDefinition,
    options?: AnimationOptions,
  ): void {
    animate(el, keyframes, options);
  }

  private createHoverAnimation(
    el: HTMLElement | NodeListOf<Element>,
    keyframes: DOMKeyframesDefinition,
    callbackKeyframes: DOMKeyframesDefinition,
    options?: AnimationOptions,
    callbackOptions?: AnimationOptions,
    hoverOptions?: EventOptions,
  ): void {
    hover(
      el,
      () => {
        animate(el, keyframes, options);
        return () => animate(el, callbackKeyframes, callbackOptions);
      },
      hoverOptions,
    );
  }

  private createInViewAnimation(
    el: HTMLElement | NodeListOf<Element>,
    keyframes: DOMKeyframesDefinition,
    callbackKeyframes: DOMKeyframesDefinition,
    options?: AnimationOptions,
    callbackOptions?: AnimationOptions,
    inViewOptions?: IInViewOptions,
  ): void {
    inView(
      el,
      () => {
        animate(el, keyframes, options);
        return () => animate(el, callbackKeyframes, callbackOptions);
      },
      inViewOptions,
    );
  }
}
