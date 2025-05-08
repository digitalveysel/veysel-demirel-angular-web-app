import { Injectable, signal, computed } from '@angular/core';
import { ITheme, IThemeValues } from '../models/theme.model';

interface IAppState {
  cursorLabel: string;
  theme: ITheme;
  isMuted: boolean;
  isMenuOpen: boolean;
  activeSection: string;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  private _state = signal<IAppState>({
    cursorLabel: '',
    theme: IThemeValues.DARK,
    isMuted: false,
    isMenuOpen: false,
    activeSection: '#heroSection',
  });

  readonly cursorLabel = computed(() => this._state().cursorLabel);
  readonly theme = computed(() => this._state().theme);
  readonly isMuted = computed(() => this._state().isMuted);
  readonly isMenuOpen = computed(() => this._state().isMenuOpen);
  readonly activeSection = computed(() => this._state().activeSection);

  setCursorLabel(value: string): void {
    this._state.update((s) => ({ ...s, cursorLabel: value }));
  }

  clearCursorLabel(): void {
    this._state.update((s) => ({ ...s, cursorLabel: '' }));
  }

  setTheme(value: ITheme): void {
    this._state.update((s) => ({ ...s, theme: value }));
  }

  setIsMuted(value: boolean): void {
    this._state.update((s) => ({ ...s, isMuted: value }));
  }

  setIsMenuOpen(value: boolean): void {
    this._state.update((s) => ({ ...s, isMenuOpen: value }));
  }

  setActiveSection(value: string): void {
    this._state.update((s) => ({ ...s, activeSection: value }));
  }
}
