import { Component } from '@angular/core';
import { AppStore } from '../../../../core/store/app.store';
import { SoundService } from '../../../../core/services/sound/sound.service';
import { IconComponent } from '../icon/icon.component';
import { AnimationDirective } from '../../../directives/animation/animation.directive';

@Component({
  selector: 'vd-menu-button',
  imports: [IconComponent, AnimationDirective],
  template: `<button
    id="menuButton"
    aria-label="Toggle Menu"
    class="flex size-10 items-center justify-center p-1"
    (click)="onClick()"
  >
    @if (store.isMenuOpen()) {
      <vd-icon
        name="close"
        size="32"
        [vdAnimation]="{
          keyframes: { scale: [0, 1] },
        }"
      />
    } @else {
      <vd-icon
        name="menu"
        size="32"
        [vdAnimation]="{
          keyframes: { scale: [0, 1] },
        }"
      />
    }
  </button>`,
})
export class MenuButtonComponent {
  constructor(
    public store: AppStore,
    private soundService: SoundService,
  ) {}

  onClick(): void {
    this.soundService.play('click');
    this.store.setIsMenuOpen(!this.store.isMenuOpen());
  }
}
