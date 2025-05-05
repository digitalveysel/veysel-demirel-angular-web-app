import { Injectable, signal, computed } from '@angular/core';

interface AppState {
  cursorLabel: string;
  lightMode: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  private _state = signal<AppState>({
    cursorLabel: '',
    lightMode: false,
  });

  readonly cursorLabel = computed(() => this._state().cursorLabel);
  readonly lightMode = computed(() => this._state().lightMode);

  setCursorLabel(label: string) {
    this._state.update((s) => ({ ...s, cursorLabel: label }));
  }

  clearCursorLabel() {
    this._state.update((s) => ({ ...s, cursorLabel: '' }));
  }

  toggleLightMode() {
    this._state.update((s) => ({ ...s, lightMode: !s.lightMode }));
  }

  setLightMode(enabled: boolean) {
    this._state.update((s) => ({ ...s, lightMode: enabled }));
  }
}
