import { Injectable, signal, computed } from '@angular/core';
import { ITheme, IThemeValues } from '../models/theme.model';

interface IAppState {
  cursorLabel: string;
  theme: ITheme;
  isMuted: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  private _state = signal<IAppState>({
    cursorLabel: '',
    theme: IThemeValues.DARK,
    isMuted: false,
  });

  readonly cursorLabel = computed(() => this._state().cursorLabel);
  readonly theme = computed(() => this._state().theme);
  readonly isMuted = computed(() => this._state().isMuted);

  setCursorLabel(value: string) {
    this._state.update((s) => ({ ...s, cursorLabel: value }));
  }

  clearCursorLabel() {
    this._state.update((s) => ({ ...s, cursorLabel: '' }));
  }

  setTheme(value: ITheme) {
    this._state.update((s) => ({ ...s, theme: value }));
  }

  setIsMuted(value: boolean) {
    this._state.update((s) => ({ ...s, isMuted: value }));
  }
}
