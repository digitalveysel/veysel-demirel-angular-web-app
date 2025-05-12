import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AnimationDirective } from '../../../directives/animation/animation.directive';
import { AppStore } from '../../../core/store/app.store';
import { SoundService } from '../../../core/services/sound/sound.service';

@Component({
  selector: 'vd-sound-button',
  imports: [IconComponent, AnimationDirective],
  template: `<button
    id="soundButton"
    aria-label="Toggle Sound"
    class="flex size-10 items-center justify-center p-2"
    (click)="onClick()"
  >
    @if (store.isMuted()) {
      <vd-icon
        name="sound-off"
        size="24"
        [vdAnimation]="{
          keyframes: { scale: [0, 1] },
        }"
      />
    } @else {
      <vd-icon
        name="sound-on"
        size="24"
        [vdAnimation]="{
          keyframes: { scale: [0, 1] },
        }"
      />
    }
  </button>`,
})
export class SoundButtonComponent {
  constructor(
    public store: AppStore,
    private soundService: SoundService,
  ) {}

  async onClick(): Promise<void> {
    if (this.store.isMuted()) {
      await this.soundService.play('sound-on', true);
    }

    this.soundService.toggleMuted();
  }
}
