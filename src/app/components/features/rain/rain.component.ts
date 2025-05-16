import { afterNextRender, Component, signal } from '@angular/core';
import { AppStore } from '../../../core/store/app.store';
import { IAnimation } from '../../../core/models/animation.model';
import { AnimationDirective } from '../../../directives/animation/animation.directive';
import { NgStyle } from '@angular/common';

interface IDrop {
  left: string;
  animation: IAnimation;
}

interface IGlob {
  drop: IDrop;
  stem: IAnimation;
  splat: IAnimation;
}

@Component({
  selector: 'vd-rain',
  imports: [AnimationDirective, NgStyle],
  template: ` @if (store.isRainy()) {
    <div class="pointer-events-none fixed inset-0 z-8 select-none">
      @for (glob of globs(); track $index) {
        <div
          class="-translate-y absolute -top-12 h-12 w-4"
          [ngStyle]="{ left: glob.drop.left }"
          [vdAnimation]="glob.drop.animation"
        >
          <span
            class="absolute top-0 right-1/2 h-2/3 w-px -translate-x-1/2 rounded-full bg-linear-to-t from-neutral-300 to-transparent"
            [vdAnimation]="glob.stem"
          ></span>
          <span
            class="absolute bottom-0 h-1/3 w-4 rounded-full border-t-2 border-dotted border-neutral-500"
            [vdAnimation]="glob.splat"
          ></span>
        </div>
      }
    </div>
  }`,
})
export class RainComponent {
  globs = signal<IGlob[]>([]);

  constructor(public store: AppStore) {
    afterNextRender(() => {
      this.onRain();
    });
  }

  onRain(): void {
    this.globs.set([]);

    for (let i = 0; i < 100; i++) {
      const rDelay = this.getRandomNumber(1, 100) / 5;
      const rDuration = this.getRandomNumber(4, 5);
      const rPosition = this.getRandomNumber(1, 100);

      this.globs.set([
        ...this.globs(),
        {
          drop: {
            left: `${rPosition}%`,
            animation: {
              keyframes: {
                y: ['-100vh', '100vh'],
              },
              options: {
                delay: rDelay,
                duration: rDuration,
                repeat: Infinity,
                ease: 'linear',
              },
            },
          },
          stem: {
            keyframes: { opacity: [1, 1, 0] },
            options: {
              delay: rDelay + 0.1,
              duration: rDuration,
              repeat: Infinity,
              times: [0, 0.8, 1],
              ease: 'linear',
            },
          },
          splat: {
            keyframes: { opacity: [0, 0, 1, 0], scale: [0, 0, 1, 2] },
            options: {
              delay: rDelay,
              duration: rDuration,
              repeat: Infinity,
              times: [0, 0.9, 0.95, 1],
              ease: 'linear',
            },
          },
        },
      ]);
    }
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
  }
}
