import { afterNextRender, Injectable } from '@angular/core';
import { AppStore } from '../../store/app.store';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private cache: Record<string, HTMLAudioElement> = {};

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
    this.store.setIsMuted(isMuted);
    Object.values(this.cache).forEach((audio) => {
      audio.volume = isMuted ? 0 : 1;
    });
  }

  toggleMuted(): void {
    localStorage.setItem('isMuted', JSON.stringify(!this.store.isMuted()));
    this.setIsMuted(!this.store.isMuted());
  }

  async play(name: string, skipMutedCheck = false): Promise<void> {
    if (this.store.isMuted() && !skipMutedCheck) {
      return;
    }

    let audio: HTMLAudioElement | undefined = this.cache[name];

    if (!audio) {
      audio = new Audio(`/sounds/${name}.mp3`);
      this.cache[name] = audio;
    }

    audio.currentTime = 0;

    try {
      await audio.play();
    } catch (err) {
      console.error(`Failed to play sound: ${name}`, err);
      throw err;
    }
  }

  stop(name: string): void {
    const audio = this.cache[name];

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}
