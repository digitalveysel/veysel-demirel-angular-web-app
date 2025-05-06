import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { AppStore } from '../../../../core/store/app.store';
import { IThemeValues } from '../../../../core/models/theme.model';
import { SoundService } from '../../../../core/services/sound/sound.service';

@Component({
  selector: 'vd-theme-button',
  imports: [IconComponent],
  template: `<button
    id="themeButton"
    class="relative flex items-center justify-center p-1"
    (click)="onClick()"
  >
    @switch (store.theme()) {
      @case (themeValue.DARK) {
        <vd-icon name="light-mode" size="32" />
      }
      @case (themeValue.LIGHT) {
        <vd-icon name="dark-mode" size="32" />
      }
    }
  </button>`,
})
export class ThemeButtonComponent {
  themeValue = IThemeValues;

  constructor(
    public store: AppStore,
    private soundService: SoundService,
    private themeService: ThemeService,
  ) {}

  onClick(): void {
    this.themeService.toggle();
    this.soundService.play('click');
  }
}
