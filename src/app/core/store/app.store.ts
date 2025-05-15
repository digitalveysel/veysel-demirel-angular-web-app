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
  private $state = signal<IAppState>({
    cursorLabel: '',
    theme: IThemeValues.DARK,
    isMuted: false,
    isMenuOpen: false,
    activeSection: 'hero',
  });

  readonly cursorLabel = computed(() => this.$state().cursorLabel);
  readonly theme = computed(() => this.$state().theme);
  readonly isMuted = computed(() => this.$state().isMuted);
  readonly isMenuOpen = computed(() => this.$state().isMenuOpen);
  readonly activeSection = computed(() => this.$state().activeSection);

  setCursorLabel(value: string): void {
    this.$state.update((s) => ({ ...s, cursorLabel: value }));
  }

  clearCursorLabel(): void {
    this.$state.update((s) => ({ ...s, cursorLabel: '' }));
  }

  setTheme(value: ITheme): void {
    this.$state.update((s) => ({ ...s, theme: value }));
  }

  setIsMuted(value: boolean): void {
    this.$state.update((s) => ({ ...s, isMuted: value }));
  }

  setIsMenuOpen(value: boolean): void {
    this.$state.update((s) => ({ ...s, isMenuOpen: value }));
  }

  setActiveSection(value: string): void {
    this.$state.update((s) => ({ ...s, activeSection: value }));
  }
}
