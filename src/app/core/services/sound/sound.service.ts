import { Injectable } from '@angular/core';
import { AppStore } from '../../store/app.store';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private cache: Record<string, HTMLAudioElement> = {};

  constructor(private store: AppStore) {}

  setIsMuted(isMuted: boolean): void {
    this.store.setIsMuted(isMuted);
    Object.values(this.cache).forEach((audio) => {
      audio.volume = isMuted ? 0 : 1;
    });
  }

  toggleMuted(): void {
    this.setIsMuted(!this.store.isMuted());
  }

  play(name: string): void {
    if (this.store.isMuted()) {
      return;
    }

    if (!this.cache[name]) {
      const audio = new Audio(`/sounds/${name}.mp3`);
      this.cache[name] = audio;
    }

    this.cache[name].currentTime = 0;
    this.cache[name].play();
  }

  stop(name: string): void {
    const audio = this.cache[name];

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}
