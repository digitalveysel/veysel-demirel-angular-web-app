import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationDirective } from '../../../directives/animation/animation.directive';

@Component({
  selector: 'vd-logo',
  imports: [RouterLink, AnimationDirective],
  template: `<a
    routerLink=""
    fragment="hero"
    id="logo"
    class="text-20px flex items-center gap-x-1 font-semibold line-through"
    role="img"
    aria-label="Logo"
  >
    @for (letter of letters; let index = $index; track index) {
      <span
        [class]="{ 'text-neutral-200': index < 6 }"
        [vdAnimation]="{
          keyframes: { y: [-10, 0], opacity: [0, 1] },
          options: { delay: index * 0.1 },
        }"
      >
        {{ letter }}
      </span>
    }
  </a>`,
})
export class LogoComponent {
  letters: string[] = ['v', 'e', 'y', 's', 'e', 'l', 'd', 'e', 'm', 'i', 'r', 'e', 'l'];
}
