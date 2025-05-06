import { afterNextRender, Inject, Injectable } from '@angular/core';
import { AppStore } from '../../store/app.store';
import { DOCUMENT } from '@angular/common';
import { ITheme, IThemeValues } from '../../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    private store: AppStore,
    @Inject(DOCUMENT) private document: Document,
  ) {
    afterNextRender(() => {
      this.checkTheme();
    });
  }

  private checkTheme(): void {
    const lsValue = localStorage.getItem(IThemeValues.KEY);

    if (lsValue) {
      this.setTheme(lsValue as ITheme);
    }
  }

  private setTheme(value: ITheme): void {
    localStorage.setItem(IThemeValues.KEY, value);
    this.store.setTheme(value);
    this.document.documentElement.setAttribute(IThemeValues.ATTR, value);
  }

  toggle(): void {
    const sTheme = this.store.theme();
    this.setTheme(sTheme === IThemeValues.DARK ? IThemeValues.LIGHT : IThemeValues.DARK);
  }
}
