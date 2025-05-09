import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { AppStore } from '../../../../core/store/app.store';
import { IThemeValues } from '../../../../core/models/theme.model';
import { SoundService } from '../../../../core/services/sound/sound.service';
import { AnimationDirective } from '../../../directives/animation/animation.directive';

@Component({
  selector: 'vd-theme-button',
  imports: [IconComponent, AnimationDirective],
  template: `<button
    id="themeButton"
    aria-label="Toggle Theme"
    class="flex size-10 items-center justify-center p-2"
    (click)="onClick()"
  >
    @switch (store.theme()) {
      @case (themeValues.DARK) {
        <vd-icon
          name="light-mode"
          size="24"
          [vdAnimation]="{
            keyframes: { scale: [0, 1] },
          }"
        />
      }
      @case (themeValues.LIGHT) {
        <vd-icon
          name="dark-mode"
          size="24"
          [vdAnimation]="{
            keyframes: { scale: [0, 1] },
          }"
        />
      }
    }
  </button>`,
})
export class ThemeButtonComponent {
  themeValues = IThemeValues;

  constructor(
    public store: AppStore,
    private soundService: SoundService,
    private themeService: ThemeService,
  ) {}

  onClick(): void {
    this.soundService.play('click');
    this.themeService.toggle();
  }
}
