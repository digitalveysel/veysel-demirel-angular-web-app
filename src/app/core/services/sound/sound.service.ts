import { afterNextRender, Injectable } from '@angular/core';
import { AppStore } from '../../store/app.store';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  cache: Record<string, HTMLAudioElement> = {};

  constructor(private store: AppStore) {
    afterNextRender(() => {
      this.checkIsMuted();
    });
  }

  private checkIsMuted(): void {
    const lsValue = localStorage.getItem('isMuted');

    if (lsValue) {
      this.setIsMuted(JSON.parse(lsValue));
    }
  }

  setIsMuted(isMuted: boolean): void {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
    this.store.setIsMuted(isMuted);
    Object.values(this.cache).forEach((audio) => {
      audio.volume = isMuted ? 0 : 1;
    });
  }

  toggleMuted(): void {
    this.setIsMuted(!this.store.isMuted());
  }

  async play(name: string, skipIsMutedCheck = false, resetCurrentTime = true): Promise<void> {
    if (this.store.isMuted() && !skipIsMutedCheck) {
      return;
    }

    let audio: HTMLAudioElement | undefined = this.cache[name];

    if (!this.cache[name]) {
      audio = this.setCache(name);
    }

    if (resetCurrentTime) {
      audio.currentTime = 0;
    }

    audio.volume = this.store.isMuted() ? 0 : 1;

    try {
      await audio.play();
    } catch (err) {
      console.error(`SoundService: Failed to play sound: ${name}`, err);
      throw err;
    }
  }

  pause(name: string): void {
    const audio = this.cache[name];

    if (audio) {
      audio.pause();
    }
  }

  setCache(name: string): HTMLAudioElement {
    const audio = new Audio(`/sounds/${name}.mp3`);
    this.cache[name] = audio;
    return audio;
  }
}
